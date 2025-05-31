import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

/**
 * Edge function to record successful payments in the database
 *
 * This is called after a successful Stripe payment to update
 * the user's subscription status in the database
 */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase admin client with service role key for database writes
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get auth user
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Authorization header is required");
    }

    const token = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser(token);

    if (userError || !user) {
      throw new Error("Invalid user token");
    }

    // Parse request body
    const { sessionId, amount, productName, status } = await req.json();

    // Initialize Stripe with the provided secret key
    const stripe = new Stripe("", {
      apiVersion: "2023-10-16",
    });

    // Verify the session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      throw new Error("Invalid session ID");
    }

    // Insert subscription record into database
    const { data, error } = await supabaseAdmin
      .from("subscriptions")
      .upsert({
        user_id: user.id,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: session.subscription as string,
        status: status || "active",
        price: amount || 999,
        product_name: productName || "Premium Subscription",
        created_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      throw new Error(`Failed to store subscription: ${error.message}`);
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Payment record error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
