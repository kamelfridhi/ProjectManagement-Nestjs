import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
import { TeamModule } from './modules/team-module/team.module';
import { TaskModule } from './modules/task/task.module';
import { ProjectModule } from './modules/project/project.module';
import { MongooseModule } from '@nestjs/mongoose';
import {StatusModule} from "./modules/status/status.module";



@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/project-managment'),
    UserModule,
    TeamModule,
    TaskModule,
      StatusModule,
    ProjectModule,
    ],


  controllers: [],
  providers: [],
})
export class AppModule { }
