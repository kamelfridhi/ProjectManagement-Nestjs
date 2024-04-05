import {User} from "../../../schemas/user.schema";

export class SendChatMessageDto {
    senderId: User;
    content: string;
}
