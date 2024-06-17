import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { CreateAccountInput, CreateAccountOutput } from "./dto/create-account.dto";
import { LoginInput, LoginOutput } from './dto/login.dto';
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthUser } from "src/auth/auto-user.decorator";
import { UserProfilInput, UserPofileOutput } from "src/users/dto/user-profile.dto";
import { EditProfileInput, EditProfileOutput } from './dto/edit-prfile.dto';

@Resolver(of => User)
export class UsersResolver{
    constructor(private readonly usersService:UsersService){}
    @Query(returns => Boolean)
    hi(){
        return true;
    }

    @Mutation(returns => CreateAccountOutput)
    async createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput>{
        try {
            const [ok, error] = await this.usersService.createAccount(createAccountInput);
            return {
                ok,
                error,
            }
        } catch (error) {
            return{
                error,
                ok: false,
            }
        }
    }

    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput :LoginInput): Promise<LoginOutput>{
        try {
            return await this.usersService.login(loginInput)
        } catch (error) {
            return{
                ok: false,
                error,
            }
        } 
    }

    @Query(returns => User)
    @UseGuards(AuthGuard)
    me(@AuthUser() authUser: User){
        return authUser;
    }
    
    @UseGuards(AuthGuard)
    @Query(returns => UserPofileOutput)
    async userProfile(@Args() userProfileInput: UserProfilInput): 
    Promise<UserPofileOutput>{
        try{
            const user= await this.usersService.findById(userProfileInput.userId);
            if(!user){
                throw Error();
            }
                return{
                    ok:true,
                    user,
                };
        }catch(e){
            return{
                error: "User Not Found",
                ok:false,
            }
        }
    }

    @UseGuards(AuthGuard)
    @Mutation(returns => EditProfileOutput)
    async editProfile(@AuthUser() authUser: User, @Args('input') editProfileInput: EditProfileInput): Promise<EditProfileOutput>{
        try{
            await this.usersService.editProfile(authUser.id, editProfileInput);
            return{
                ok:true,
                
            }
        }catch(error){
            return{
                ok:false,
                error: "Could not update profile."
            }
        }
    }
}