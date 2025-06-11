import { Injectable } from '@kernel/decorators/injectable';

@Injectable()
export class CreateMealUseCase {
  async execute(): Promise<any> {
    return {
      CreateMealUseCase: 'CREATE MEAL!!!',
    };
  }
}
