import { Field, ArgsType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from 'src/users/entities/user.entity';

@ArgsType()
export class UserProfilInput{
    @Field(type=>Number)
    userId: number;
}

@ObjectType()
export class UserPofileOutput extends CoreOutput{
    @Field(type => User, {nullable: true})
    user?: User;
}