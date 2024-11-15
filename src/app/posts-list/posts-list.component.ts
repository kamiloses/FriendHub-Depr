import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostComponent} from './post/post.component';
import {Post} from '../models/post-model';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [
    PostComponent,
    FormsModule
  ],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
export class PostsListComponent implements OnInit, OnDestroy {



  posts: Post[] = [];
  private subscription: Subscription | null = null;

  constructor(private httpClient: HttpClient,private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(() => {
      this.updateHeader();
    });
  }


  ngOnInit(): void {
    console.log("wynik: "+this.currentRoute)
    this.updateHeader();
    this.subscription = this.httpClient.get<Post[]>("http://localhost:8080/api/posts").subscribe({
      next: (data) => {
        console.log(data);
        this.posts = data;
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

//creating post
  newPostContent: string = '';

  onPublish() {
    if (!this.newPostContent.trim()) {
      alert("Post content cannot be empty");
      return;
    }

    const newPost = { content: this.newPostContent };
    this.httpClient.post('http://localhost:7070/api/posts', newPost).subscribe({
      next: (response) => {
        console.log('Post added successfully:', response);
        this.newPostContent = '';
      },
      error: (error) => {
        console.error('Error adding post:', error);
      },
      complete: () => {
        console.log('Post submission complete.');
      }
    });
  }









  currentRoute!: string;





  updateHeader() {
    this.currentRoute = this.router.url;
  }


}
