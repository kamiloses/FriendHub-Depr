import {User} from './user-model';
import {model} from '@angular/core';

export interface PublishCommentModel {
  content: string;
  postId: string;
  parentCommentId?: string;
}
