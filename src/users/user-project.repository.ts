import { ConflictException, UnauthorizedException } from "@nestjs/common";
import { AuthCredentialDto} from "src/users/dto/auth-credential.dto";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';
import { UserProjects } from "./user-project.entity";

@EntityRepository(UserProjects)
export class UserProjectsRepository extends Repository<UserProjects> {
    async createUserProjects(user_id, project_id) {
        const userProjects = this.create({ user_id, project_id });
        this.save(userProjects)
        
        
        try{
            await this.save(userProjects);
            return 1;
        }catch (e){
            console.log(e);
        }
    }
}