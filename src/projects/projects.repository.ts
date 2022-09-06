import { EntityRepository, Repository } from "typeorm";
import { Project } from "./projects.entity";

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
    async getProjectById(id: number): Promise<Project>{
        const project = await this.findOne(id);
        return project;
    }
}