import parser from "lambda-multipart-parser";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "node:crypto";
import { response } from "./utils/response.js";

export async function handler(event) {
  const { files } = await parser.parse(event);
  const [file] = files;

  if (!file || file.fieldname !== "file") {
    return response(400, {
      error: "file is not provided",
    });
  }

  if (file.contentType !== "image/png") {
    return response(400, {
      error: "Only png files are accepted",
    });
  }

  const s3Client = new S3Client({ region: "sa-east-1" });
  const command = new PutObjectCommand({
    Bucket: "leotestexd",
    Key: `uploads/${crypto.randomUUID()}-${file.filename}`,
    Body: file.content,
  });

  const s3Response = await s3Client.send(command);

  return { statusCode: 204, body: null };
}
