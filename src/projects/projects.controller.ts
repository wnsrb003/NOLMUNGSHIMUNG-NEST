import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './projects.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private projectService: ProjectsService) {}

    @Get('/')
    getProjects(){
        return this.projectService.getProjects();
    }
    @Get('/:id')
    getProjectById(@Param('id') id: number):Promise<Project>{
        return this.projectService.getProjectById(id);
    }

    @Post()
    createProject(@Body() createProjectDto: CreateProjectDto){
        return this.projectService.createProject(createProjectDto);
    }
}
