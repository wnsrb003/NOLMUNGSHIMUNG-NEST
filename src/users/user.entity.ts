import { Project } from "src/projects/projects.entity";
import { text } from "stream/consumers";
import { BaseEntity, Column, Entity, IsNull, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['user_email'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    user_email: string;

    @Column()
    user_name: string;

    @Column()
    password: string;

    @Column({
        nullable: true,
        default: ''
    })
    certificationNumber?: string | null;

    @Column({
        nullable: true,
        default: ''
    })
    userAccessToken?: string | null;

    @Column({
        nullable: true,
        default: ''
    })
    userRefreshToken?: string | null;

    @Column({
        nullable: true,
        default: ''
    })
    createdBy?: string | null;

    @Column({
        nullable: true,
        default: ''
    })
    updatedBy?: string | null;

    @Column({
        nullable: true,
        default: ''
    })
    provider?: string | null;

    @ManyToMany(type => Project, project => project.people)
    // @JoinTable()
    // @ManyToMany(() => Project), (project) => project.people)
    // @JoinTable()
    // @Column()
    user_projects: Project[]

    @Column({
        nullable: true,
        default: ''
    })
    refresh_token?: string | null;
}