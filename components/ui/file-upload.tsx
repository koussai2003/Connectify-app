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
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleUploadComplete = (res: { url: string }[]) => {
    onChange(res?.[0]?.url);
    console.log("Files: ", res);
    setImageUrl(res[0].url);
  };

  const handleUploadError = (error: Error) => {
    console.log(error);
  };

  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf" && imageUrl.length > 0) {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={imageUrl} alt="Upload" className="rounded-full" />
        <button
          onClick={() => {
            onChange("");
          }}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadows-sm ">
          <X className="h-4 w-4"></X>
        </button>
      </div>
    );
  }

  return <UploadDropzone endpoint={endpoint} onClientUploadComplete={handleUploadComplete} onUploadError={handleUploadError} />;
};
