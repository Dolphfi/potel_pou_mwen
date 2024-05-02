import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantDto } from './create-restaurant.dto';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
class UpdateRestaurantInputType extends PartialType(CreateRestaurantDto) {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  isVegan?: boolean;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  ownersName?: string;
}


@InputType()
export class UpdateRestaurantDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
