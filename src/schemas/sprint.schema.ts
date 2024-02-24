import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserRoles } from "./enums/user.roles";

@Schema()
export class Sprint{

    @Prop({ required: true })
    teamName: string;

    
    @Prop({ required: true })
    description: string;
    
    
}

export const SprintSchema = SchemaFactory.createForClass(Sprint);