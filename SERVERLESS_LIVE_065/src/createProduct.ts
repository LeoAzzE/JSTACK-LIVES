export async function handler() {
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Product successfully created!",
    }),
  };
}
