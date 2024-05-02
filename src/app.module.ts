import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
import { TeamModule } from './modules/team-module/team.module';
import { TaskModule } from './modules/task/task.module';
import { ProjectModule } from './modules/project/project.module';
import { MongooseModule } from '@nestjs/mongoose';
import {StatusModule} from "./modules/status/status.module";
import { MulterModule } from "@nestjs/platform-express";



@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Specify the destination folder for uploaded files
    }),
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://yassinejallouli:Ub7PILeQooKLyeG1@picluserteamsphere.bcrby0d.mongodb.net/'),
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
