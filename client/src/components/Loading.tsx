import { Spinner } from "../components/ui/spinner";

function Loading({ message }: { message: string }) {
  return (
    <div className="flex justify-center items-center gap-5 mt-10">
      <Spinner className="size-30" />
      <p className="text-3xl font-bold">{message}</p>
    </div>
  );
}
export default Loading;
