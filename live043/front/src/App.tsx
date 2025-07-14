import { CloudUploadIcon } from 'lucide-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './components/Button';
import { bytesToMb, cn } from './lib/utils';
import { uploadBatchFiles } from './services/uploadBatchFiles';

export function App() {
  const [files, setFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    onDrop: (acceptedFiles) => setFiles(acceptedFiles),
  });

  async function handleUpload() {
    if (!files.length) {
      return;
    }

    await uploadBatchFiles(files);
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

        {files.length > 0 && (
          <div className="mt-10 border-t pt-8">
            <div className="space-y-2">
              {files.map(file => (
                <div key={file.name}>
                  <span>{file.name}</span>
                  <small className="text-muted-foreground block">
                    {bytesToMb(file.size)}MB
                  </small>
                </div>
              ))}
            </div>

            <Button className="w-full mt-4" onClick={handleUpload}>
              Upload
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
