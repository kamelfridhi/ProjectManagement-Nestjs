import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Board{

    @Prop({ required: true })
    title: string;

    
}

export const BoardSchema = SchemaFactory.createForClass(Board);