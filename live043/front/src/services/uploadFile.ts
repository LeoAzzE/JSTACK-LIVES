import axios from 'axios';
import { getPresignedPOST } from './getPresignedPOST';

export async function uploadFile(file: File) {
  const { url, fields } = await getPresignedPOST(file);

  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  formData.append('file', file);

  await axios.post(url, formData);
}
