import { IController, IRequest, IResponse } from "../interfaces/IController";

export class ListLeadsController implements IController {
  async handle(): Promise<IResponse> {
    return {
      statusCode: 200,
      body: {
        leads: [
          { id: "1", name: "Zezin" },
          { id: "2", name: "Leozin" },
          { id: "3", name: "Carlin" },
        ],
      },
    };
  }
}
