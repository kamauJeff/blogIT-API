import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import { Spinner } from "../components/ui/spinner";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import Api from "@/lib/axios";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { toast } from "sonner";
import { Alert, AlertTitle } from "../components/ui/alert";
import axios from "axios";
import MDEditor from "@uiw/react-md-editor"; 
import UploadImage from "@/components/UploadImage"; 

type BlogDetails = {
  blogTittle: string;
  synopsis: string;
  content: string;
  featuredImageUrl: string;
};

function UpdateBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogTittle, setBlogTittle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");

  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: ["Get Task"],
    queryFn: async () => {
      const response = await Api.get(`/blogs/${id}`);
      return response.data;
    },
  });

  const { isPending, mutate } = useMutation({
    mutationKey: ["Update Blog"],
    mutationFn: async (blogDetails: BlogDetails) => {
      const response = await Api.patch(`/blogs/${id}`, blogDetails);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setUpdateError(error.response?.data.message);
      } else {
        setUpdateError("An unexpected error occurred");
      }
    },
    onSuccess: () => {
      toast.success("Blog successfully Updated", {
        position: "top-center",
      });
      navigate("/allBlogs");
    },
  });

  useEffect(() => {
    if (data) {
      setBlogTittle(data.blogTittle);
      setSynopsis(data.synopsis);
      setContent(data.content);
      setFeaturedImageUrl(data.featuredImageUrl);
    }
  }, [data]);

  function handleUpdateBlog(e: React.FormEvent) {
    e.preventDefault();
    mutate({ blogTittle, synopsis, content, featuredImageUrl });
    setUpdateError("");
  }

  if (isError) {
    return (
      <Error message="An unexpected error occurred">
        <Button size="lg" onClick={() => refetch()}>
          Retry
        </Button>
      </Error>
    );
  }
  if (isLoading) {
    return <Loading message="Loading blog for update, please wait.." />;
  }

  return (
    <div className="w-full min-h-screen flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-lg border rounded-lg p-6 shadow-sm bg-card">
        <h1 className="text-3xl font-bold text-center mb-6">Update Blog</h1>
        <form className="space-y-4" onSubmit={handleUpdateBlog}>
          {updateError && (
            <Alert variant="destructive">
              <AlertTitle>{updateError}</AlertTitle>
            </Alert>
          )}

          <div className="flex flex-col space-y-1">
            <Label htmlFor="title">Blog Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Blog Title"
              value={blogTittle}
              onChange={(e) => setBlogTittle(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <Label htmlFor="synopsis">Synopsis</Label>
            <Input
              id="synopsis"
              type="text"
              placeholder="Blog Synopsis"
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <Label htmlFor="content">Content (Markdown)</Label>
            <MDEditor value={content} onChange={(val) => setContent(val || "")} />
          </div>

          
          <div className="flex flex-col space-y-1">
            <Label htmlFor="featuredImageUrl">Featured Image</Label>
            <UploadImage setImageUrl={setFeaturedImageUrl} />
            {featuredImageUrl && (
              <img
                src={featuredImageUrl}
                alt="Featured preview"
                className="mt-2 rounded-lg shadow-md w-full object-cover max-h-64"
              />
            )}
          </div>

          <Button
            type="submit"
            className="w-full mt-4"
            size="lg"
            disabled={isPending}
          >
            {isPending && <Spinner />}
            Update          </Button>
        </form>
      </div>
    </div>
  );
}

export default UpdateBlog;
