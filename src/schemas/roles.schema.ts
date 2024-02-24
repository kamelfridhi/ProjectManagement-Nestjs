import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserRoles } from "./enums/user.roles";

@Schema()
export class Role{

    @Prop({ required: true })
    role: UserRoles;
    
}

export const UserRoleSchema = SchemaFactory.createForClass(Role);