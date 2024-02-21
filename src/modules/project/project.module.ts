
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { projectController } from './project.controller'; 
import { project, projectSchema } from 'src/schemas/project.schema';
import { projectService } from './project.service';

@Module({
    imports:[MongooseModule.forFeature([{
        name: project.name,
        schema: projectSchema,
    }])],
    providers:[
        projectService,
    ],
    controllers:[projectController]
})
export class ProjectModule {


}