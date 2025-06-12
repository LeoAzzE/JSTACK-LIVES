import { Controller } from '@application/contracts/Controller';
import { Schema } from '@kernel/decorators/Schema';
import { SignUpBody, signUpSchema } from './schemas/signUpSchema';
import { SignUpUseCase } from '@application/usecases/auth/SignUpUseCase';
import { Injectable } from '@kernel/decorators/injectable';

@Injectable()
@Schema(signUpSchema)
export class SignUpController extends Controller<SignUpController.Response> {
  constructor(private readonly signUpUseCase: SignUpUseCase) {
    super();
  }
  protected override async handle({
    body,
  }: Controller.Request<SignUpBody>): Promise<
    Controller.Response<SignUpController.Response>
  > {
    const { account } = body;
    const { acessToken, refreshToken } = await this.signUpUseCase.execute(
      account,
    );
    return {
      statusCode: 201,
      body: {
        acessToken,
        refreshToken,
      },
    };
  }
}

export namespace SignUpController {
  export type Response = { acessToken: string; refreshToken: string };
}
