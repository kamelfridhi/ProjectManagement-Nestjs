import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import {ChatMessage} from "../../schemas/ChatMessage.schema";

@WebSocketGateway()
export class TeamWebSocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    afterInit(server: Server) {
        console.log('WebSocket Gateway initialized');
    }

    handleConnection(client: any, ...args: any[]) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: any) {
        console.log(`Client disconnected: ${client.id}`);
    }

    sendChatMessageToClients(chatMessage: ChatMessage): void {
        console.log("zaez");
        this.server.emit('chatMessage', chatMessage); // Broadcast the chat message to all clients
    }
}
