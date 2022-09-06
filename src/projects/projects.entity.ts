import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

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

    // @ManyToMany(type => User, user => user.user_email, {eager: true})
    // people: string;
}