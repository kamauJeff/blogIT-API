import { useEffect, useRef } from "react";

declare global {
  interface Window {
    cloudinary: any;
  }
}

interface UploadImageProps {
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}

function UploadImage({ setImageUrl }: UploadImageProps) {
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    if (!window.cloudinary) return; 

    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: "dkzzxgcme", 
        uploadPreset: "kamauJeff", 
      },
      (error: any, result: any) => {
        if (!error && result.event === "success") {
          setImageUrl(result.info.secure_url);
        }
      }
    );
  }, [setImageUrl]);

  return (
    <button
  type="button"
  onClick={() => widgetRef.current && widgetRef.current.open()}
  className="bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition hover:scale-105"
>
  Upload Image
</button>

  );
}

export default UploadImage;
