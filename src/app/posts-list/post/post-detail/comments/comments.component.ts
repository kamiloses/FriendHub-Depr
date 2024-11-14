import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Comment } from '../../../../models/comment-model';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from '../../../../models/post-model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit , OnDestroy {



  constructor(private httpClient: HttpClient) { }

  // comments: Comment[] = [
  //    { id: '1', content: 'Pierwszy komentarz', createdAt: new Date('2024-11-01T12:00:00'), userId: 'user1', postId: 'post1', parentCommentId: null, numberOfComments: 0, numberOfLikes: 5, numberOfReplies: 0 },
  //   { id: '2', content: 'Drugi komentarz', createdAt: new Date('2024-11-02T12:10:00'), userId: 'user2', postId: 'post1', parentCommentId: null, numberOfComments: 2, numberOfLikes: 3, numberOfReplies: 1 },
  //   { id: '3', content: 'Pierwsza odpowiedź na drugi komentarz', createdAt: new Date('2024-11-02T12:20:00'), userId: 'user3', postId: 'post1', parentCommentId: '2', numberOfComments: 0, numberOfLikes: 1, numberOfReplies: 0 },
  //   { id: '4', content: 'Druga odpowiedz na drugi komentarz', createdAt: new Date('2024-11-02T12:10:00'), userId: 'user2', postId: 'post1', parentCommentId: '2', numberOfComments: 2, numberOfLikes: 3, numberOfReplies: 1 },
  //   { id: '5', content: 'ADSDAdsa', createdAt: new Date('2024-11-02T12:20:00'), userId: 'user3', postId: 'post1', parentCommentId: '6', numberOfComments: 0, numberOfLikes: 1, numberOfReplies: 0 },
  //   { id: '6', content: 'abc', createdAt: new Date('2024-11-02T12:20:00'), userId: 'user3', postId: 'post1', parentCommentId: '3', numberOfComments: 0, numberOfLikes: 1, numberOfReplies: 0 },
  //   // { id: '8', content: 'abc', createdAt: new Date('2024-11-02T12:20:00'), userId: 'user3', postId: 'post1', parentCommentId: null, numberOfComments: 0, numberOfLikes: 1, numberOfReplies: 0 },
  //   // { id: '7', content: 'abc', createdAt: new Date('2024-11-02T12:20:00'), userId: 'user3', postId: 'post1', parentCommentId: '1', numberOfComments: 0, numberOfLikes: 1, numberOfReplies: 0 }
  // ];

  comments:Comment[]=[];

  getReplies(commentId: string): Comment[] {
    return this.comments.filter(comment => comment.parentCommentId === commentId);
  }
  getMainComments(): Comment[] {
    return this.comments.filter(comment => comment.parentCommentId === null);
  }



  private subscription: Subscription | null = null;

  @Input({required:true})currentRoute?: string;



  ngOnInit(): void {

    this.subscription = this.httpClient.get<Comment[]>("http://localhost:8083/api/comments/"+this.currentRoute).subscribe({
      next: (data) => {
        console.log("comment.ts:"+data);
        this.comments = data;
      },
      error: (error) => {
        console.error('Error while downloading data:', error);
      }
    });

  }

  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
