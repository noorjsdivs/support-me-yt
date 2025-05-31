import React, { useState, useEffect } from "react";
import { useProfile } from "@/hooks/use-profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload, User } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

/**
 * Component for uploading an image to Cloudinary
 * Uses Cloudinary's unsigned upload preset
 */
async function uploadToCloudinary(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "supportme_unsigned"); // Cloudinary preset
  formData.append("cloud_name", "dlbqw7atu");

  try {
    // Log the upload attempt
    console.log("Attempting to upload to Cloudinary...");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dlbqw7atu/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Cloudinary upload error:", errorData);
      throw new Error(errorData.error?.message || "Upload failed");
    }

    const data = await response.json();
    console.log("Upload successful:", data);
    return data.secure_url;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}

export function ProfileForm() {
  const { profile, isLoading, updateProfile, isPending } = useProfile();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Update form when profile data loads
  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "");
      setFullName(profile.full_name || "");
      setBio(profile.bio || "");
      setWebsite(profile.website || "");
      setAvatarUrl(profile.avatar_url || "");
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    updateProfile({
      username,
      full_name: fullName,
      bio,
      website,
      avatar_url: avatarUrl,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match("image.*")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      // Show upload starting toast
      toast({
        title: "Uploading image",
        description: "Your profile image is being uploaded...",
      });

      const url = await uploadToCloudinary(file);
      setAvatarUrl(url);
      toast({
        title: "Image uploaded",
        description: "Your profile image has been uploaded successfully",
      });
    } catch (error: any) {
      console.error("Upload error details:", error);
      toast({
        title: "Upload failed",
        description:
          error.message || "There was a problem uploading your image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-muted">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground">
                  <User className="h-12 w-12" />
                </div>
              )}
            </div>
            <div className="absolute bottom-0 right-0">
              <Label htmlFor="avatar-upload" className="cursor-pointer">
                <div className="rounded-full bg-primary p-2 shadow-md">
                  <Upload className="h-4 w-4 text-primary-foreground" />
                </div>
              </Label>
              <Input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
            </div>
          </div>
          {isUploading && (
            <p className="text-sm text-muted-foreground">Uploading...</p>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your username"
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your full name"
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
            rows={4}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://example.com"
            type="url"
          />
        </div>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </form>
  );
}
