import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      <Link to="/" className="flex items-center space-x-2">
        <div className="relative w-10 h-10 overflow-hidden">
          <div className="absolute inset-0 bg-coffee-yellow rounded-full"></div>
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-3 bg-coffee-dark rounded-t-full"></div>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-3 bg-white rounded-full"></div>
        </div>
        <span className="font-bold text-2xl text-primary">SupportMe</span>
      </Link>
    </div>
  );
};
export default Logo;
