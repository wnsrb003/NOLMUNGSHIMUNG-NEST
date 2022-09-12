import { UserProjects } from "src/users/user-project.entity";
import { User } from "src/users/user.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
// @Unique(['projectId'])
export class Project extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_email: string;

    @Column()
    user_name: string;

    @Column()
    start_date: string;

    @Column()
    end_date: string;

    @Column()
    term: number;

    @Column()
    project_title: string;

    @Column()
    routes: string;

    @Column()
    quillRefEditor: string;

    @Column()
    log: string;

    @Column()
    upload_flag: string;

    @Column()
    trip_date: string;

    // @OneToMany(type => UserProjects, userproject => userproject.project_people, { eager: true})
    // people: Promise<UserProjects[]>;
    @ManyToMany(() => User)
    @JoinTable()
    people: User[]
}