import React, { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InputDocProps {
  onUpload?: (file: File) => void;
  onClear?: () => void;
  className?: string;
}

export const InputDoc = ({
  onUpload,
  onClear,
  className,
}: InputDocProps) => {
  const [fileSelected, setFileSelected] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setFileSelected(true);
      setFileName(file.name);
      onUpload?.(file);
    } else {
      alert("Veuillez sélectionner un fichier PDF.");
    }
  };

  const handleClear = () => {
    setFileSelected(false);
    setFileName(null);
    if (inputRef.current) inputRef.current.value = "";
    onClear?.();
  };

  const handleClickUpload = () => {
    inputRef.current?.click();
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      <Button
        type="button"
        size="icon"
        onClick={handleClickUpload}
        variant={fileSelected ? "default" : "outline"}
        className={cn(
          "rounded-full w-10 h-10",
          fileSelected && "bg-sina-500 text-white hover:bg-sina-600"
        )}
        title="Téléverser un document"
      >
        <Upload size={18} />
      </Button>

      {fileName && (
        <span className="text-sm text-gray-700 truncate max-w-[180px]">
          {fileName}
        </span>
      )}

      <Button
        type="button"
        size="icon"
        variant="outline"
        className="rounded-full w-10 h-10"
        onClick={handleClear}
        title="Effacer le fichier sélectionné"
        disabled={!fileSelected}
      >
        <X size={18} />
      </Button>
    </div>
  );
};

export default InputDoc;
