import { CloudUploadIcon } from 'lucide-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './components/Button';
import { bytesToMb, cn } from './lib/utils';
import { uploadFile } from './services/uploadFile';

export function App() {
  const [file, setFile] = useState<File>();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop: ([acceptedFile]) => setFile(acceptedFile),
  });

  async function handleUpload() {
    if (!file) {
      return;
    }

    await uploadFile(file);
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="w-full max-w-sm">
        <div
          {...getRootProps()}
          className={cn(
            'border border-dashed p-10 rounded-lg cursor-pointer flex flex-col items-center justify-center gap-2 transition-colors',
            isDragActive && 'bg-accent',
          )}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon className="size-10" />
          <span className="text-muted-foreground">Solte o arquivo aqui</span>
        </div>

        {file && (
          <div className="mt-10 border-t pt-8">
            <span>{file.name}</span>
            <small className="text-muted-foreground block">
              {bytesToMb(file.size)}MB
            </small>

            <Button className="w-full mt-4" onClick={handleUpload}>
              Upload
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
