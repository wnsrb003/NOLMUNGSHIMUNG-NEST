import { User } from "src/users/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateProjectDto } from "./dto/create-project.dto";
import { Project } from "./projects.entity";

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
    async getProjectById(id: number): Promise<Project>{
        const project = await this.findOne(id, { relations: ["people"]});
        project.routes = '[]'
        return project;
    }
 
    async createProject(createProjectDto: CreateProjectDto, user: User): Promise<Project>{
        const {
            start_date,
            end_date,
            term,
            project_title,
            // routes,
            // quillRefEditor,
            // log,
            // upload_flag,
          } = createProjectDto;
          const newProject = this.create({
              user_email: user.user_email,
              user_name: user.user_name,
              start_date,
              end_date,
              term,
              project_title,
              routes: '[]',
              quillRefEditor: '',
              log: '',
              upload_flag: '',
              trip_date: '',
              people: [user]
          });

          await this.save(newProject);
          
          newProject['projectId'] = newProject.id;
          return newProject;
    }
}