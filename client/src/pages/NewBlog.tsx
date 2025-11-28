import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Alert, AlertTitle } from "../components/ui/alert";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Api from "@/lib/axios";
import axios from "axios";
import { toast } from "sonner";
import { Spinner } from "../components/ui/spinner";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor"; // ✅ Markdown editor
import UploadImage from "../components/UploadImage"; // ✅ Cloudinary widget component

interface NewBlogType {
  blogTittle: string;
  synopsis: string;
  content: string;
  featuredImageUrl: string;
}

function NewBlog() {
  const [blogTittle, setBlogTittle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [newBlogError, setNewBlogError] = useState("");
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["Create Blog"],
    mutationFn: async (newBlog: NewBlogType) => {
      const response = await Api.post("/blogs", newBlog);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setNewBlogError(
          error.response?.data.message || "An unexpected error occured"
        );
      } else {
        setNewBlogError("An unexpected error occured");
      }
    },
    onSuccess: () => {
      toast.success("New Blog created Successfully", {
        position: "top-center",
        duration: 1500,
      });
      navigate("/allBlogs");
    },
  });

  function handleCreateBlog(e: React.FormEvent) {
    e.preventDefault();
    mutate({ blogTittle, synopsis, content, featuredImageUrl });
    setNewBlogError("");
    setBlogTittle("");
    setContent("");
    setSynopsis("");
    setFeaturedImageUrl("");
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
           Create a New Blog
        </h1>

        <form className="space-y-6" onSubmit={handleCreateBlog}>
          {newBlogError && (
            <Alert variant="destructive" className="rounded-lg">
              <AlertTitle>{newBlogError}</AlertTitle>
            </Alert>
          )}

          {/* Blog Title */}
          <div className="flex flex-col space-y-2">
            <Label className="font-semibold text-gray-700">Blog Title</Label>
            <Input
              type="text"
              placeholder="Enter a catchy blog title..."
              value={blogTittle}
              onChange={(e) => setBlogTittle(e.target.value)}
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-coral-500"
            />
          </div>

          {/* Synopsis */}
          <div className="flex flex-col space-y-2">
            <Label className="font-semibold text-gray-700">Synopsis</Label>
            <Input
              type="text"
              placeholder="Brief summary of your blog..."
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              className="rounded-lg border-gray-300 focus:ring-2 focus:ring-coral-500"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col space-y-2">
            <Label className="font-semibold text-gray-700">
              Content (Markdown)
            </Label>
            <MDEditor
              value={content}
              onChange={(val) => setContent(val || "")}
              height={300}
              className="rounded-lg border border-gray-200 shadow-sm"
            />
          </div>

          {/* Featured Image */}
          <div className="flex flex-col space-y-2">
            <Label className="font-semibold text-gray-700">Featured Image</Label>
            <UploadImage setImageUrl={setFeaturedImageUrl} />
            {featuredImageUrl && (
              <img
                src={featuredImageUrl}
                alt="Uploaded"
                className="w-full h-64 object-cover rounded-xl mt-4 shadow-md hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-6 bg-green-500 hover:bg-coral-600 text-black font-bold rounded-xl py-3 transition-all duration-300"
            size="lg"
            disabled={isPending}
          >
            {isPending && <Spinner />}
          Publish Blog
          </Button>
        </form>
      </div>
    </div>
  );
}

export default NewBlog;
