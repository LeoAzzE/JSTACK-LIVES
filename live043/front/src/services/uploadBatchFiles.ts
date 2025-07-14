import axios from 'axios';
import { getPresignedBatchPOST } from './getPresignedBatchPOST';

export async function uploadBatchFiles(files: File[]) {
  const { url, fields } = await getPresignedBatchPOST(files);

  await Promise.allSettled(
    files.map(async file => {
      const formData = new FormData();
      const fileKey = `user1/${window.crypto.randomUUID()}-${file.name}`;

      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append('key', fileKey);
      formData.append('Content-Type', file.type);
      formData.append('file', file);

      await axios.post(url, formData);
    })
  );
}
