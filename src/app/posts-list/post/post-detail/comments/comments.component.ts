import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Comment } from '../../../../models/comment-model';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit , OnDestroy {



  constructor(private httpClient: HttpClient) { }

  comments:Comment[]=[];

  getMainComments(): Comment[] {
    return this.comments.filter(comment => comment.parentCommentId === null);
  }

  replyInput:string=''
  subReplyInput:string=''
  nestedReplyInput:string=''

  private subscription: Subscription | null = null;

  @Input({required:true})currentRoute?: string;



  ngOnInit(): void {

    this.subscription = this.httpClient.get<Comment[]>("http://localhost:8083/api/comments/"+this.currentRoute).subscribe({
      next: (data) => {
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

  sendComment(comment: Comment) {

     comment.parentCommentId=comment.id;
     comment.content='test123'
    this.subscription = this.httpClient.post<void[]>("http://localhost:8083/api/comments?username=kamiloses",comment).subscribe({});
    window.location.reload();
  }





}


