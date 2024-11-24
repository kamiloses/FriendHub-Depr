import {User} from './user-model';

export interface Message {
  chatId: string;
  sender: User;
  recipient: User;
  content: string;
  timestamp: Date;
  isRead: boolean;
}
