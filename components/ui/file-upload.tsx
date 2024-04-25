import { X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { useState } from "react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(value);

  const handleUploadComplete = (res: { url: string }[]) => {
    onChange(res?.[0]?.url);
    console.log("Files: ", res);
    setImageUrl(res[0].url);
  };

  const handleUploadError = (error: Error) => {
    console.log(error);
  };

  return (
    <>
      {imageUrl ? (
        <div className="relative h-20 w-20">
          <Image src={imageUrl} alt="Upload" className="rounded-full" layout="fill" objectFit="cover" />
          <button
            onClick={() => {
              onChange("");
              setImageUrl(undefined);
            }}
            className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm ">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <UploadDropzone endpoint={endpoint} onClientUploadComplete={handleUploadComplete} onUploadError={handleUploadError} />
      )}
    </>
  );
};
