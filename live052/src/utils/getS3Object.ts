import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "node:stream";

import { s3Client } from "../clients/s3Client";

interface IGetS3ObjectParams {
  bucket: string;
  key: string;
}

export async function getS3Object({ bucket, key }: IGetS3ObjectParams) {
  const getObjectCommand = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  const { Body } = await s3Client.send(getObjectCommand);

  if (!(Body instanceof Readable)) {
    throw new Error(`Cannot find file ${bucket}/${key}`);
  }

  const chunks = [];
  for await (const chunk of Body) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}
