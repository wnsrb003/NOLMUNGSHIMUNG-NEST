import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './projects.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
@UseGuards(AuthGuard())
export class ProjectsController {
    constructor(private projectService: ProjectsService) {}

    @Get('/')
    getProjects(@Body() body){
        return this.projectService.getProjects();
    }
    @Get('/:id')
    getProjectById(@Param('id') id: number):Promise<Project>{
        return this.projectService.getProjectById(id);
    }

    @Post('/')
    createProject(
        @Body() createProjectDto: CreateProjectDto,
        @GetUser() user : User){
        return this.projectService.createProject(createProjectDto[1], user);
    }
}
