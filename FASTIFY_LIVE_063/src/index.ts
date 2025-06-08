import Fastify, { type FastifyRequest } from "fastify";

const fastify = Fastify();

type Request = FastifyRequest<{
  Params: { id: string };
  Querystring: { page: string };
  Body: { name: string };
  Headers: { org: string };
  Reply: {
    201: { id: string };
    "4xx": { message: "qlr coisa" };
  };
}>;

fastify.post("/users/:id", (request: Request, reply) => {
  const { params, body, query, headers } = request;

  reply.code(201).send({
    params: {
      id: params.id,
    },
    query: {
      page: Number(query.page),
    },
    body: {
      name: body.name,
    },
    headers: {
      org: headers.org,
    },
  });
});

async function main() {
  try {
    const host = await fastify.listen({ port: 3000 });
    console.log(`server started at  ${host}`);
  } catch (err) {
    console.log(err);
  }
}

main();
