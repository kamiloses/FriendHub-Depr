import {User} from './user-model';

export interface SendMessageModel {
  chatId: string;
  senderUsername:string|null;
  recipientUsername: string|null;
  content: string;

}
