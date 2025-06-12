import { AuthGateway } from '@infra/gateways/AuthGateway';
import { Injectable } from '@kernel/decorators/injectable';

@Injectable()
export class SignUpUseCase {
  constructor(private readonly authGateway: AuthGateway) {}
  async execute({
    email,
    password,
  }: SignUpUseCase.Input): Promise<SignUpUseCase.OutPut> {
    const { externalId } = await this.authGateway.signUp({ email, password });
    return {
      acessToken: 'Acess token gerado...',
      refreshToken: 'Refresh token gerado...',
    };
  }
}

export namespace SignUpUseCase {
  export type Input = { email: string; password: string };

  export type OutPut = { acessToken: string; refreshToken: string };
}
