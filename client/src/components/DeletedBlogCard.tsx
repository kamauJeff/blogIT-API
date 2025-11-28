import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Api from "@/lib/axios";
import ReactMarkdown from "react-markdown"; // ✅ added

interface BlogCardProps {
  blogTittle: string;
  synopsis: string;
  content: string;
  id: string;
}

function DeletedBlogCard({ blogTittle, synopsis, content, id }: BlogCardProps) {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationKey: ["Recover Blog"],
    mutationFn: async () => {
      const response = await Api.patch(`/blogs/recover/${id}`);
      return response.data;
    },
    onError: () => {
      toast.error("Unable to recover blog", {
        position: "top-center",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Get Trash"],
      });
      toast.success("Blog successfully recovered", {
        position: "top-center",
      });
    },
  });
  return (
    <Card
      className="w-full max-w-md shadow-md rounded-2xl p-4 transition-all
        hover:shadow-lg hover:scale-[1.01]"
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center justify-betwwen">
          {blogTittle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{synopsis}</p>
      </CardContent>

      <CardContent>
        <div className="text-sm text-muted-foreground prose max-w-none break-words">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2 mt-4">
        <Button
          variant="outline"
          className="rounded-xl transition-all bg-primary text-white hover:bg-accent hover:text-accent-foreground"
          disabled={isPending}
          onClick={() => mutate()}
        >
          Restore
        </Button>
      </CardFooter>
    </Card>
  );
}
export default DeletedBlogCard;
