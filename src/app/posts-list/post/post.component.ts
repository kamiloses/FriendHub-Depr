import {Component, Input} from '@angular/core';
import {Post} from '../../models/post-model';
import {RouterLink} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user-model';

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


      this.httpClient.post<void>(`http://localhost:8080/api/retweet?postId=${this.postDetails.id}&username=${this.loggedUserUsername}`, null)
        .subscribe(() => {
          window.location.reload();
        });

  }
  undoRetweet(event:MouseEvent):void{
    event.stopPropagation();

    this.httpClient.delete<void>(`http://localhost:8080/api/retweet?postId=${this.postDetails.id}&username=${this.loggedUserUsername}`)
      .subscribe(() => {
        window.location.reload();
      });

  }



  protected readonly event = event;

}
