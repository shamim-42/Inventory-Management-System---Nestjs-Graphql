import { CreateUserInput } from './create-user.input';
import { PartialType } from '@nestjs/graphql';

export class UpdateUserInput extends PartialType(CreateUserInput) {
  id: number;
}
