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
    constructor(
        private projectService: ProjectsService, 
        private authService: AuthService) {}

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
        if(rtn) this.authService.updateUserProjects(user, rtn);
        return rtn;
    }

    @Post('/title')
    async getTitle(@Body() projectIds){
        const projectInfo = []
        for (let i=0; i<projectIds.length; i++){
            projectInfo.push(await this.projectService.getProjectById(projectIds[i])) 
        };
        return {
            success: true,
            projectInfo: projectInfo,
            message: "여행일정 제목을 성공적으로 불러왔습니다.",
            }
        // return this.projectService.getProjectById(projectId);
    }

    @Get('/friends/:id')
    async getFriends(@Param() projectId: number){
        const people = await (await this.projectService.getProjectById(projectId)).people
        const friends = []
        // for (let i=0; i<people.length; )
        console.log(people)
        return people;
    }
}
