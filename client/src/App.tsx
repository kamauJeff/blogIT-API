import Register from "./pages/Register";
import LandingPage from "./pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AllBlogs from "./pages/AllBlogs";
import NewBlog from "./pages/NewBlog";
import Trash from "./pages/Trash";
import UpdateBlog from "./pages/UpdateBlog";
import ProfilePage from "./pages/Profile";
import DashboardLayout from "./components/Dashboard";
import UploadImage from "./components/UploadImage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Standalone routes (optional, can remove if only inside dashboard) */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newBlog" element={<NewBlog />} />
        <Route path="/allBlogs" element={<AllBlogs />} />
        <Route path="/blogs/trash" element={<Trash />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/blogs/update/:id" element={<UpdateBlog />} />

        {/* Dashboard with nested routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="newBlog" element={<NewBlog />} />
          <Route path="allBlogs" element={<AllBlogs />} />
          <Route path="trash" element={<Trash />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="update/:id" element={<UpdateBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
