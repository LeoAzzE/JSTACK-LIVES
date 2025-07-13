import axios from "axios";

export async function getPresignedURL(file: File) {
  const { data } = await axios.post<{ signedUrl: string }>(
    "", // URL da sua lambda aqui!
    { fileName: file.name }
  );

  return data.signedUrl;
}
