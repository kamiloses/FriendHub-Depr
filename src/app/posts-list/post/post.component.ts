import {Component, Input} from '@angular/core';
import {Post} from '../../models/post-model';
import {RouterLink} from '@angular/router';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Input({required: true}) postDetails!: Post

  constructor(private httpClient: HttpClient) {
  }

  protected readonly JSON = JSON;

  @Input() loggedUserUsername!: string;


  retweet(event:MouseEvent ): void {
    event.stopPropagation();
    this.postDetails.retweetCount += 1;
    this.postDetails.retweetedByMe = true;

    this.httpClient.post<void>(`http://localhost:8080/api/retweet?postId=${this.postDetails.id}&username=${this.loggedUserUsername}`, null)
      .subscribe(() => {

      });

  }
  undoRetweet(event:MouseEvent):void{
    event.stopPropagation();

    this.postDetails.retweetCount -= 1;
    this.postDetails.retweetedByMe = false;
    this.httpClient.delete<void>(`http://localhost:8080/api/retweet?postId=${this.postDetails.id}&username=${this.loggedUserUsername}`)
      .subscribe(() => {

      });

  }



  protected readonly event = event;








  likeThePost(event:MouseEvent ): void {
    event.stopPropagation();
    this.postDetails.likeCount += 1;
    this.postDetails.likedByMe = true;

    this.httpClient.post<void>(`http://localhost:8087/api/like?postId=${this.postDetails.id}&username=${this.loggedUserUsername}`, null)
      .subscribe(() => {
      });

  }
  unlikeThePost(event:MouseEvent):void{
    event.stopPropagation();
    this.postDetails.likeCount -= 1;
    this.postDetails.likedByMe = false;
    this.httpClient.delete<void>(`http://localhost:8087/api/like?postId=${this.postDetails.id}&username=${this.loggedUserUsername}`)
      .subscribe(() => {
      });

  }



}
