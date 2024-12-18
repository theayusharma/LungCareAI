import { useState, useContext, useEffect } from "react";
import { DataContext } from "../components/DataContext";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ImageUploadPage() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { response, setResponse } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (response) {
      navigate("/DiagnosisPage");
    }
  }, [response, navigate]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = () => {
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setImagePreview(URL.createObjectURL(droppedFile));
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select or drop an image.");
      return;
    }

    setSubmitLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/classify`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      setResponse(result.data);
      alert("Image uploaded and classified successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the image.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="pt-16">
      <div className="text-center"><b className="text-lg font-bold text-center">Note:</b><p className="text-sm">Only Histopathological scan of Lung tissue can be used for diagnosis.</p></div>
      <h1 className="text-3xl font-bold text-center mt-10">Image Upload</h1>
      <div className="flex flex-col items-center mt-4 p-2">
        <div
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex justify-center items-center h-60 w-full max-w-md border-4 ${isDragging ? "border-green-500 bg-green-200" : "border-dashed border-green-500 bg-gray-100"
            } text-center rounded-lg mb-4 mx-4 sm:mx-0`}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="object-contain w-full h-full rounded-lg"
            />
          ) : (
            "Drag and drop an image here"
          )}
        </div>
        <div>
          <input
            type="file"
            onChange={handleFileSelect}
            accept="image/*"
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-md file:font-semibold file:bg-blue-50 file:text-green-700 hover:file:bg-green-100"
          />
        </div>
        {file && (
          <p className="text-center mt-4 text-sm">Selected File: {file.name}</p>
        )}
        <div className="flex flex-col sm:flex-row justify-center mt-4 gap-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="p-2 py-2 px-4 rounded-full border-0 text-md font-semibold bg-blue-50 text-green-700 hover:bg-green-100 hover:scale-105 transition-transform duration-300"
          >
            {submitLoading ? "Submitting..." : "Submit Image"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageUploadPage;
