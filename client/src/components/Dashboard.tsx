import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner"; 

export default function DashboardLayout() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await axios.post(
        "http://localhost:1000/auth/logout", 
        {},
        { withCredentials: true }           
      );

      toast.success("Successfully logged out", {
        position: "top-center",
        duration: 2000,
      });

      navigate("/"); 
    } catch (error) {
      console.error("Logout failed:", error);

      toast.error("Logout failed. Please try again.", {
        position: "top-center",
      });
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white/80 backdrop-blur-md shadow-lg p-6 flex flex-col gap-6">
        {/* ✅ Make Admin Dashboard clickable */}
        <Link 
          to="/dashboard" 
          className="text-2xl font-bold text-gray-800 hover:text-blue-600"
        >
          Admin Dashboard
        </Link>

        <nav className="flex flex-col gap-4">
          <Link to="register" className="text-lg font-medium hover:text-blue-600">Register</Link>
          <Link to="login" className="text-lg font-medium hover:text-blue-600">Login</Link>
          <Link to="newBlog" className="text-lg font-medium hover:text-blue-600">Create Blog</Link>
          <Link to="allBlogs" className="text-lg font-medium hover:text-blue-600">All Blogs</Link>
          <Link to="trash" className="text-lg font-medium hover:text-blue-600">Trash</Link>
          <Link to="profile" className="text-lg font-medium hover:text-blue-600">Profile</Link>
        </nav>

        {/* ✅ Logout Button */}
        <Button
          variant="destructive"
          className="mt-auto bg-red-500 text-white hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <Outlet /> {/* Nested routes render here */}
      </main>
    </div>
  );
}
