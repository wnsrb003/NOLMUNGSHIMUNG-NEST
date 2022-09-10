import { Project } from "src/projects/projects.entity";
import { text } from "stream/consumers";
import { BaseEntity, Column, Entity, IsNull, ManyToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

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

    // @OneToOne(type => Project, project => project.id, {eager: true})
    @Column({
        nullable: true,
        default: ''
    })
    user_projects?: string | null;

    @Column({
        nullable: true
    })
    refresh_token?: string | null;
}