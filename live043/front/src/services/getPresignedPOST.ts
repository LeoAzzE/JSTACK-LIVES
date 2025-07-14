/* eslint-disable quotes */
import axios from "axios";

type GetPresignedPostResponse = {
  url: string;
  fields: Record<string, string>;
};

export async function getPresignedPOST(file: File) {
  const lambdaURL = ""; //URL AQUI

  const { data } = await axios.post<GetPresignedPostResponse>(lambdaURL, {
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
  });

  return data;
}
