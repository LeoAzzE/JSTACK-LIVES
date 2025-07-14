/* eslint-disable quotes */
import axios from "axios";

type GetPresignedPostResponse = {
  url: string;
  fields: Record<string, string>;
};

export async function getPresignedBatchPOST(files: File[]) {
  const lambdaURL = ""; //URL AQUI

  const { data } = await axios.post<GetPresignedPostResponse>(lambdaURL, {
    files: files.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
    })),
  });

  const { url, fields } = data;
  delete fields.key;

  return {
    url,
    fields,
  };
}
