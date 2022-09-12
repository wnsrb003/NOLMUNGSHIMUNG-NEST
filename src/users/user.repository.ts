import { ConflictException, UnauthorizedException } from "@nestjs/common";
import { AuthCredentialDto} from "src/users/dto/auth-credential.dto";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(AuthCredentialDto: AuthCredentialDto): Promise<User> {
        const {user_email, user_name, password} = AuthCredentialDto;
        
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ user_email, user_name, password: hashedPassword });
        
        try{
            await this.save(user);
            return user;
        }catch (e){
            console.log(e);
            
            if (e.code === '23505') throw new ConflictException('같은 이름이 존재해.')
        }
    }

    async findUserByEmail(user_email: string): Promise<User> {        
        const user = await this.findOne({user_email}, {relations: ['user_projects']});
        
        return user;

    }

}