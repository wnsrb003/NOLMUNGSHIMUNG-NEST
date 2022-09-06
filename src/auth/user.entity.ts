import { Project } from "src/projects/projects.entity";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['user_email'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    user_name: string;
    
    @Column()
    user_email: string;

    @Column()
    password: string;

    @Column()
    certificationNumber: string;

    @Column()
    userAccessToken: string;

    @Column()
    userRefreshToken: string;

    @Column()
    createdBy: string;

    @Column()
    updatedBy: string;

    @Column()
    provider: string;

    @ManyToMany(type => Project, project => project.id, {eager: true})
    user_projects: string;
}