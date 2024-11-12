import {Component} from '@angular/core';
import {Comment} from './comment-model';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {


  commentsToPost(): Comment[] {
    return this.comments.filter(comment => comment.parentCommentId === null);
  }


  comments: Comment[] = [{
    id: '1',
    content: 'Pierwszy komentarz',
    createdAt: new Date('2024-11-01T12:00:00'),
    userId: 'user1',
    postId: 'post1',
    parentCommentId: null,
    numberOfComments: 0,
    numberOfLikes: 5,
    numberOfReplies: 0,
    replies: []
  },
    {
      id: '2',
      content: 'Drugi komentarz',
      createdAt: new Date('2024-11-02T12:10:00'),
      userId: 'user2',
      postId: 'post1',
      parentCommentId: null,
      numberOfComments: 2,
      numberOfLikes: 3,
      numberOfReplies: 1,
      replies: [
        {
          id: '3',
          content: 'Pierwsza odpowiedź na drugi komentarz',
          createdAt: new Date('2024-11-02T12:20:00'),
          userId: 'user3',
          postId: 'post1',
          parentCommentId: '2',
          numberOfComments: 0,
          numberOfLikes: 1,
          numberOfReplies: 0,
          replies: []
        }
      ]
    },

    ]





}







