import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setimageLoadingState,
  imageLoadingState,
}) => {
  const inputref = useRef(null);
  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }
  function handleDragOver(event) {
    event.preventDefault();
  }
  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }
  function handleRemoveImage() {
    setImageFile(null);
    if (inputref.current) {
      inputref.current.value = "";
    }
  }
  async function uploadImageToCloudinary(){
    setimageLoadingState(true)
    const data = new FormData();
    data.append('my_file',imageFile);
    const response = await axios.post('http://localhost:3002/api/admin/products/upload-image',data)
    if(response?.data?.success){
        setUploadedImageUrl(response.data.result.url);
         setimageLoadingState(false)}
  }
  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);
  return (
    <div className="w-full max-w-md mx-auto p-2">
      <label className="text-lg font-semibold mb-2 block">Upload Image</label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex flex-col justify-center items-center border-2 rounded-2xl border-gray-900"
      >
        <Input
          id="image-upload"
          type="file"
          ref={inputref}
          onChange={handleImageFileChange}
          className="hidden"
        />
        {!imageFile ? (
          <label
            htmlFor="image-upload"
            className="flex flex-col item-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2 ml-20" />
            <span>Drag & Drop Or Upload an Image</span>
          </label>
        ) : (
          
          <div className="flex items-center justify-between">
            <FileIcon className="w-7 h-8 text-primary mr-2" />
            <p>{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />{" "}
              <span className="sr-only">Remove File </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
