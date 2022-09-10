import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/user.entity';
import { AuthService } from 'src/users/users.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './projects.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
// @UseGuards(AuthGuard())
export class ProjectsController {
    constructor(private projectService: ProjectsService, private authService: AuthService) {}

    @Get('/')
    getProjects(@Body() body){
        return this.projectService.getProjects();
    }
    @Get('/:id')
    getProjectById(@Param('id') id: number):Promise<Project>{
        return this.projectService.getProjectById(id);
    }

    @Post('/')
    async createProject(@Body() createProjectDto: CreateProjectDto){
        const user_email = createProjectDto[0];
        const user: User = await this.authService.findUserByEmail(user_email);
        const rtn = await this.projectService.createProject(createProjectDto[1], user);
        if(rtn) this.authService.updateUserProjects(user, rtn.id);
        return rtn;
    }

    @Post('/title')
    getTitle(@Body() projectId){
        console.log('!!!!', projectId);
        return 0;
        // return this.projectService.getProjectById(projectId);
    }
}
