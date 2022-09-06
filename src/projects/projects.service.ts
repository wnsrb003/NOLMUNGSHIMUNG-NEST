import { Injectable, NotFoundException } from '@nestjs/common';
import { rejects } from 'assert/strict';
import { resolve } from 'path';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './projects.entity';
import { ProjectRepository } from './projects.repository';

@Injectable()
export class ProjectsService {
  constructor(private projectRepository: ProjectRepository) {}

  async getProjects(){
      return await this.projectRepository.find();
  }
  
  async getProjectById(id: number): Promise<Project> {
    return this.projectRepository.getProjectById(id);
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const {
      start_date,
      end_date,
      term,
      project_title,
      routes,
      quillRefEditor,
      log,
      upload_flag,
    } = createProjectDto;
    const newProject = this.projectRepository.create({
        user_email: 'user_email',
        user_name: 'user_name',
        start_date,
        end_date,
        term,
        project_title,
        routes,
        quillRefEditor,
        log,
        upload_flag,
        trip_date: "trip_date",
        // people: "people"
    });

    await this.projectRepository.save(newProject);
    return newProject;
  }
}
