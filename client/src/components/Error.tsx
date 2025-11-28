import React from "react";

function Error({
  message,
  children,
}: {
  message: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-10">
      <p className="text-3l font-bold">{message}</p>
      {children}
    </div>
  );
}
export default Error;
