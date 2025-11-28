import { useQuery } from "@tanstack/react-query";
import Api from "@/lib/axios";
import Loading from "../components/Loading";
import BlogCard from "../components/BlogCard";
import Error from "../components/Error";
import { Button } from "../components/ui/button";

interface Blog {
  id: string;
  blogTittle: string;
  content: string;
  synopsis: string;
  featuredImageUrl: string;
}

function AllBlogs() {
  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: ["Get Blogs"],
    queryFn: async () => {
      const response = await Api.get("/blogs");
      return response.data;
    },
  });

  if (isLoading) {
    return <Loading message="Loading blogs, please wait..." />;
  }

  if (isError) {
    return (
      <Error message="An unexpected error occured">
        <Button size="lg" onClick={() => refetch()}>
          Retry
        </Button>
      </Error>
    );
  }

  return (
    <div className="w-full min-h-screen px-6 py-12 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="w-full max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
           All Blogs
        </h1>
        <div className="mt-2 w-24 h-1 bg-coral-500 mx-auto rounded-full"></div>
      </div>

      {/* Blog Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl mx-auto">
        {data &&
          data.map((blog: Blog) => (
            <BlogCard
              blogTitle={blog.blogTittle}
              synopsis={blog.synopsis}
              content={blog.content}
              featuredImageUrl={blog.featuredImageUrl}
              id={blog.id}
              key={blog.id}
            />
          ))}
      </div>
    </div>
  );
}

export default AllBlogs;
