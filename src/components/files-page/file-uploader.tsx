"use client";

import React, { useRef, useState } from "react";

import { Button } from "../ui/button";
import { Label } from "../ui/label";

import { uploadFile } from "@/lib/actions/file.actions";

import { useToast } from "@/hooks/use-toast";

import { Icons } from "../shared";
import { UploadCloud } from "lucide-react";

function FileUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const handleButtonClick = () => {
    // Programmatically trigger a click on the hidden file input
    fileInputRef.current?.click();
  };

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];

    if (file) {
      setIsLoading(true);

      const res = await uploadFile(file);
      setIsLoading(false);
      return toast({
        title: res.message,
        variant: res.statusCode === 200 ? "default" : "destructive",
        duration: 1000,
      });
    }
  };

  return (
    <div className="mb-3">
      <Label htmlFor="file">
        <Button onClick={handleButtonClick} disabled={isLoading}>
          {isLoading ? (
            <>
              <Icons.spinner className="animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <UploadCloud size={18} />
              <p>Upload</p>
            </>
          )}
        </Button>
      </Label>
      <input
        ref={fileInputRef}
        onChange={handleUploadFile}
        name="file"
        type="file"
        hidden
      />
    </div>
  );
}

export default FileUploader;
