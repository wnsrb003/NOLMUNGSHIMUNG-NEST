import { IsNotEmpty } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty()
    start_date: string;

    @IsNotEmpty()
    end_date: string;

    @IsNotEmpty()
    term: number;

    @IsNotEmpty()
    project_title: string;

    routes: string;
    
    quillRefEditor: string;
    
    @IsNotEmpty()
    log: string;
    
    @IsNotEmpty()
    upload_flag: string;
}