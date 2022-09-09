import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './users/users.module';
import { typeORMConfig } from './configs/typeorm.config';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [AuthModule, ProjectsModule,
    TypeOrmModule.forRoot(typeORMConfig)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
