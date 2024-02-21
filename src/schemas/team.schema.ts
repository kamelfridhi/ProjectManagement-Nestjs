import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Team{
    
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;


}

export const TeamSchema = SchemaFactory.createForClass(Team);