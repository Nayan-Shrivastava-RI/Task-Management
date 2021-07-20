import { User } from "./user.entity";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentials } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User>{
    async createUser(authCredentials: AuthCredentials): Promise<User> {
        const { username, password } = authCredentials;

        //hash 
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);
        const user = this.create({ username, password: hashedPassword });
        
        try{
            await this.save(user);
        }catch(err){
            if(err.code === '23505'){
                throw new ConflictException('Username already exists');
            }else{
                throw new InternalServerErrorException();
            }
        }
        return user;
    }

}
