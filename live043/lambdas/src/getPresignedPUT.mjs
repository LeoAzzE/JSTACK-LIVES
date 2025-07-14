import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";

const s3Client = new S3Client();
const bucket = "live043presignpost";

export async function handler(event) {
  const { fileName, fileType, fileSize } = JSON.parse(event.body);

  if (!fileName || !fileType || !fileSize) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "fileName, fileType and fileSize are required.",
      }),
    };
  }

  const MB_IN_BYTES = 1024 * 1024;
  if (fileSize > MB_IN_BYTES) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "The file should have up to 1MB.",
      }),
    };
  }

  const fileKey = `${randomUUID()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: fileKey,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 600 });

  return {
    statusCode: 200,
    body: JSON.stringify({ url }),
  };
}
