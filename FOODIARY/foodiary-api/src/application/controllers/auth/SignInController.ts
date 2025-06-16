import { Controller } from '@application/contracts/Controller';
import { Schema } from '@kernel/decorators/Schema';
import { Injectable } from '@kernel/decorators/injectable';
import { SignInUseCase } from '@application/usecases/auth/SignInUseCase';
import { SignInBody, signInSchema } from './schemas/signInSchema';

@Injectable()
@Schema(signInSchema)
export class SignInController extends Controller<SignInController.Response> {
  constructor(private readonly signInUseCase: SignInUseCase) {
    super();
  }
  protected override async handle({
    body,
  }: Controller.Request<SignInBody>): Promise<
    Controller.Response<SignInController.Response>
  > {
    const { email, password } = body;
    const { acessToken, refreshToken } = await this.signInUseCase.execute({
      email,
      password,
    });
    return {
      statusCode: 200,
      body: {
        acessToken,
        refreshToken,
      },
    };
  }
}

export namespace SignInController {
  export type Response = { acessToken: string; refreshToken: string };
}
