import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
import { TeamModule } from './modules/team-module/team.module';
import { TaskModule } from './modules/task/task.module';
import { ProjectModule } from './modules/project/project.module';
import { sprintModule } from './modules/sprint/sprint.module';
import { MongooseModule } from '@nestjs/mongoose';
import {StatusModule} from "./modules/status/status.module";

import {NotificationModule} from "./modules/notification/notification.module";

import { MulterModule } from "@nestjs/platform-express";
import {TicketModule} from "./modules/ticket/ticket.module";




@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Specify the destination folder for uploaded files
    }),
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/project-managment'),
    UserModule,
    TeamModule,
    TaskModule,
    StatusModule,
    ProjectModule,
    sprintModule,
    TicketModule,
    NotificationModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule { }
