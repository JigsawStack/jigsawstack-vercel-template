import { useState, useCallback, useEffect } from "react";
import { Upload } from "lucide-react";
import { File } from "buffer";

type FileUploaderProps = {
  onFileChange: (file?: File) => void;
};

const FilePreview: React.FC<{
  file?: File;
}> = ({ file }) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (!file) {
      return;
    }

    // Create URL for the file
    const objectUrl = URL.createObjectURL(file as any);
    setPreviewUrl(objectUrl);

    // Cleanup function to revoke the URL when component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (!file) {
    return null;
  }

  return (
    <div
      className={`relative border-2  rounded-lg bg-gray-200 text-center
      ${"border-gray-300"}
      transition-colors duration-200 ease-in-out h-60`}
    >
      <img
        src={previewUrl}
        className="w-full h-full object-cover object-top rounded-lg"
        alt={file.name}
      />
    </div>
  );
};

const FileUploader: React.FC<FileUploaderProps> = (props) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = [...e.dataTransfer.files];
    setFiles((prevFiles) => [...droppedFiles]);
  }, []);

  const handleChange = useCallback((e) => {
    e.preventDefault();
    const selectedFiles = [...e.target.files];
    setFiles((prevFiles) => [...selectedFiles]);
  }, []);

  const removeFile = useCallback((fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  }, []);

  useEffect(() => {
    if (props?.onFileChange && files?.length > 0) {
      props?.onFileChange(files?.[0]);
    }
  }, [files.length]);

  return (
    <div className="w-full mx-auto">
      {files.length ? (
        <FilePreview file={files[0]} />
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-lg bg-gray-200 p-8 text-center
            ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
            transition-colors duration-200 ease-in-out`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleChange}
            multiple={false}
            accept="image/jpeg, image/png"
          />

          <Upload className="mx-auto h-12 w-12 text-gray-400" />

          <p className="mt-4 text-sm text-gray-600">
            Drag and drop file here, or click to select file
          </p>
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Selected file:</h3>
          <ul className="mt-2 divide-y divide-gray-200">
            {files.map((file) => (
              <li
                key={file.name}
                className="py-2 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <span className="text-sm text-gray-500">{file.name}</span>
                  <span className="ml-2 text-xs text-gray-400">
                    ({Math.round(file.size / 1024)} KB)
                  </span>
                </div>
                <button
                  onClick={() => removeFile(file.name)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
