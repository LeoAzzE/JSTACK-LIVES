import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
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

  const { url, fields } = await createPresignedPost(s3Client, {
    Bucket: bucket,
    Key: fileKey,
    Expires: 600,
    Conditions: [
      ["content-length-range", fileSize, fileSize],
      { "Content-Type": fileType },
    ],
    Fields: {
      "Content-Type": fileType,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      url,
      fields,
    }),
  };
}
