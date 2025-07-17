import { HeadObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../clients/s3Client";

interface IGetS3ObjectMetadataParams {
  bucket: string;
  key: string;
}

export async function getS3ObjectMetadata({
  bucket,
  key,
}: IGetS3ObjectMetadataParams) {
  const headObjectCommand = new HeadObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  const { Metadata } = await s3Client.send(headObjectCommand);

  return Metadata ?? {};
}
