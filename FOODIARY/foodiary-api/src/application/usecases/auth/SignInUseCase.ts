import { AuthGateway } from '@infra/gateways/AuthGateway';
import { Injectable } from '@kernel/decorators/injectable';

@Injectable()
export class SignInUseCase {
  constructor(private readonly authGateway: AuthGateway) {}
  async execute({
    email,
    password,
  }: SignInUseCase.Input): Promise<SignInUseCase.OutPut> {
    const { acessToken, refreshToken } = await this.authGateway.signIn({
      email,
      password,
    });

    return {
      acessToken,
      refreshToken,
    };
  }
}

export namespace SignInUseCase {
  export type Input = { email: string; password: string };

  export type OutPut = { acessToken: string; refreshToken: string };
}
