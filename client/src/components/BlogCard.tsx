import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Api from "@/lib/axios";
import { toast } from "sonner";
import { Spinner } from "../components/ui/spinner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

interface BlogCardProps {
  blogTitle: string;
  synopsis: string;
  content: string;
  featuredImageUrl: string;
  id: string;
}

function BlogCard({
  blogTitle,
  synopsis,
  content,
  featuredImageUrl,
  id,
}: BlogCardProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isExpanded, setIsExpanded] = useState(false);

  const { isPending, mutate } = useMutation({
    mutationKey: ["Delete Blog"],
    mutationFn: async () => {
      const response = await Api.put(`/blogs/${id}/trash`);
      return response.data;
    },
    onError: () => {
      toast.error("Unable to delete Blog. Something went wrong", {
        position: "top-center",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Get Blogs"] });
      queryClient.invalidateQueries({ queryKey: ["Get Trash"] });
      toast.success("Blog successfully moved to trash", {
        position: "top-center",
      });
    },
  });

  return (
    <Card className="w-full max-w-md bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {featuredImageUrl && (
        <div className="relative group">
          <img
            src={featuredImageUrl}
            alt={blogTitle}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <CardHeader className="px-6 pt-4">
        <CardTitle className="text-2xl font-bold text-gray-800">
          {blogTitle}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">{synopsis}</p>
      </CardHeader>

      <CardContent className="px-6">
        <div
          className={`prose max-w-none text-sm text-black-700 whitespace-pre-wrap break-words overflow-x-auto transition-all duration-300 ${
            isExpanded ? "max-h-full" : "line-clamp-5"
          }`}
        >
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-sm bg-white-500 hover:bg-coral-600 text-black rounded-full hover:underline  px-4 py-1"
        >
          {isExpanded ? "Show Less" : "Read More"}
        </Button>
      </CardContent>

      <CardFooter className="px-6 pb-4 flex justify-between items-center">
        <Button
          variant="outline"
          className="rounded-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-1 text-sm"
          onClick={() => navigate(`/blogs/update/${id}`)}
        >
          Update
        </Button>

        <Button
          variant="destructive"
          className="rounded-full bg-red-600 text-white hover:bg-red-700 px-4 py-1 text-sm flex items-center gap-2"
          disabled={isPending}
          onClick={() => mutate()}
        >
          {isPending && <Spinner />}
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default BlogCard;
