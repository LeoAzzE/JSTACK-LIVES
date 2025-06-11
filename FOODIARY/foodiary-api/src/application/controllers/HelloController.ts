import { Controller } from '@application/contracts/Controller';
import { Schema } from '@kernel/decorators/Schema';
import { helloSchema, HelloBody } from './schemas/helloSchema';
import { HelloUseCase } from '@application/usecases/HelloUseCase';
import { Injectable } from '@kernel/decorators/injectable';

@Injectable()
@Schema(helloSchema)
export class HelloController extends Controller<unknown> {
  constructor(private readonly helloUseCase: HelloUseCase) {
    super();
  }
  protected override async handle(
    request: Controller.Request<HelloBody>,
  ): Promise<Controller.Response<unknown>> {
    const result = await this.helloUseCase.execute({
      email: request.body.email,
    });
    return {
      statusCode: 200,
      body: {
        result,
      },
    };
  }
}
