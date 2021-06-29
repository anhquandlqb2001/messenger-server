import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('MessageGateway');

  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('client connected');
  }

  handleDisconnect(client: any) {
    console.log('client disconnected');
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    console.log(data);
    return data;
  }

  afterInit(server: any) {
    this.logger.log('init');
  }
}
