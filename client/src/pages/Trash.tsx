import DeletedBlogCard from "../components/DeletedBlogCard";
import { useQuery } from "@tanstack/react-query";
import Api from "@/lib/axios";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { Button } from "../components/ui/button";

interface Blog {
  id: string;
  blogTittle: string;
  content: string;
  synopsis: string;
}

function Trash() {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["Get Trash"],
    queryFn: async () => {
      const response = await Api.get("/blogs/trash");
      return response.data;
    },
  });

  if (isLoading) {
    return <Loading message="Loading trash. Please wait.." />;
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

  return (
    <div className="p-5 flex flex-wrap justify-center gap-5 w-full">
      {data && data.length > 0 ? (
        data.map((blog: Blog) => (
          <DeletedBlogCard
            blogTittle={blog.blogTittle}
            synopsis={blog.synopsis}
            content={blog.content}
            id={blog.id}
            key={blog.id}
          />
        ))
      ) : (
        <p className="text-gray-500 text-lg">Trash is empty</p>
      )}
    </div>
  );
}

export default Trash;
