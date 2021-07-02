import { CreateMessageDTO } from "./dtos/create-message.dto";

export interface CreateMessageProps {
  messageDto: CreateMessageDTO,
  userId: string
}