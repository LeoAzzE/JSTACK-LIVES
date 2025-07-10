import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "node:crypto";

import { response } from "./utils/response.js";

export async function handler(event) {
  const { filename } = JSON.parse(event.body);

  if (!filename) {
    return response(400, {
      error: "filename is required",
    });
  }

  const s3Client = new S3Client({ region: "sa-east-1" });
  const command = new GetObjectCommand({
    Bucket: "leotestexd",
    Key: `uploads/${filename}`,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 20 });

  return response(200, { url });
}
