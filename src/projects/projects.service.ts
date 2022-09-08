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
    return this.projectRepository.createProject(createProjectDto);
  }
}
