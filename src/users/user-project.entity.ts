import { Project } from "src/projects/projects.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserProjects extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: string

    @Column()
    project_id: string

    @ManyToOne(type => Project, project => project.people, {nullable: true})
    @JoinColumn({name: 'project_id'})
    project_people: Promise<Project>

    @ManyToOne(type => User, user => user.user_projects, {nullable: true})
    @JoinColumn({name: 'user_id'})
    user_project: Promise<User> 
}