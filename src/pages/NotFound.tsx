import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#FAF3DD] flex items-center justify-center p-6 font-[Quicksand]">
      <div className="text-center bg-white rounded-3xl p-8 border-4 border-[#5E6472] shadow-lg max-w-md w-full">
        <div className="p-4 bg-orange-100 rounded-full inline-block mb-6">
          <AlertTriangle size={64} className="text-orange-600" />
        </div>
        <h1 className="text-6xl font-bold mb-4 text-[#5E6472]">404</h1>
        <p className="text-2xl text-[#5E6472] mb-6 font-medium">Oops! Page not found</p>
        <p className="text-lg text-[#5E6472] mb-8 opacity-80">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center space-x-3 bg-[#5E6472] text-white px-8 py-4 rounded-2xl text-xl font-bold hover:bg-[#4a5361] transition-colors shadow-md"
        >
          <Home size={28} />
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
