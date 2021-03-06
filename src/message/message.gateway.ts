import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateMessageDTO } from './dtos/create-message.dto';
import { ReceiveMessageDTO } from './dtos/receive-message.dto';
import { MessageService } from './message.service';

@WebSocketGateway()
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(_: any, ...__: any[]) {
    console.log('client connected');
  }

  handleDisconnect(_: any) {
    console.log('client disconnected');
  }

  @SubscribeMessage('send-message')
  async handleMessage(@MessageBody() data: CreateMessageDTO) {
    const fakeUserId = '0c63e882-ac7a-4b35-b60f-91da1254ffb0'; //a

    const message = await this.messageService.createMessage({
      messageDto: data,
      userId: fakeUserId,
    });

    this.server.emit(
      'receive-message',
      ReceiveMessageDTO.createFromEntity(message),
    );
  }
}
