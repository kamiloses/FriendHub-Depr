import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommentsComponent} from './comments/comments.component';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from '../../../models/post-model';
import {Subscription} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {PublishCommentModel} from '../../../models/publishComment-model';


@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    CommentsComponent,
    FormsModule
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit, OnDestroy {


  post!: Post
  private username: string | null = null;

  protected commentModel: PublishCommentModel = { postId: '', content: '' };


  private subscription: Subscription | null = null;

  constructor(private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(() => {
      this.modifyRouter();
    });
  }

  currentRoute!: string;

  modifyRouter() {

    this.currentRoute = this.router.url.substring(this.router.url.lastIndexOf("/") + 1);
    console.log("router :" + this.currentRoute)

  }


  ngOnInit(): void {
    console.log("ZZZZZZ");
    this.username = localStorage.getItem("username");
    console.log("ZZZZZA" + this.username)

    this.subscription = this.httpClient.get<Post>("http://localhost:8080/api/posts/" + this.currentRoute).subscribe({
      next: (data) => {
        console.log(data);
        this.post = data;
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

  protected text!: string;
  onPublish() {

    this.commentModel.content = this.text
    this.commentModel.postId=this.currentRoute;

    this.subscription = this.httpClient.post<void>("http://localhost:8083/api/comments?username=" + this.username, this.commentModel, {}).subscribe();
    this.text = ''
  }
}

