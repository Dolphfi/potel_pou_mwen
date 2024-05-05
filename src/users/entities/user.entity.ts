import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, Column, Entity } from "typeorm";
import { UserRole } from "../../common/user-roles.enum";
import * as bcrypt from "bcrypt";
import { InternalServerErrorException } from "@nestjs/common";
import { IsEmail, IsEnum } from "class-validator";

registerEnumType(UserRole, {name: 'UserRole'});

@InputType({isAbstract: true})
@ObjectType()
@Entity()
export class User extends CoreEntity{

    @Field(type => String)
    @Column()
    @IsEmail()
    email: string;

    @Field(type => String)
    @Column()
    password: string;

    @Field(type => UserRole)
    @Column({type: 'enum', enum:UserRole})
    @IsEnum(UserRole)
    role: UserRole;

    @BeforeInsert()
    async hashPassword(): Promise<void>{
        try{
        this.password = await bcrypt.hash(this.password, 10);
            
        }catch(e){
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    async checkPassword(aPassword: string): Promise<boolean>{
        try {
          const comparePassword =  await bcrypt.compare(aPassword, this.password)
          return comparePassword;
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }
}
