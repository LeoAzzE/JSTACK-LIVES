import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
});

export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v4! Your function executed successfully!",
    }),
  };
}
