import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostComponent } from './post/post.component';
import { Post } from '../models/post-model';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GlobalEnvironmentVariables } from '../models/globalEnvironmentVariables';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [
    PostComponent,
    FormsModule
  ],
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private subscription: Subscription | null = null;
  username: string = '';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private globalEnvironment: GlobalEnvironmentVariables
  ) {
    this.router.events.subscribe(() => {
      this.updateHeader();
    });
  }

  ngOnInit(): void {

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.globalEnvironment.setGlobalUsername(storedUsername);
      this.username = storedUsername;
    }


    this.globalEnvironment.getGlobalUsername$().subscribe({
      next: (username) => {
        this.username = username || '';
        console.log('Username set to:', this.username);
      },
      error: (err) => {
        console.error('Error fetching username:', err);
      }
    });


    this.updateHeader();
    this.subscription = this.httpClient.get<Post[]>("http://localhost:8080/api/posts?username="+storedUsername).subscribe({
      next: (data) => {
        console.log('Posts loaded:', data);
        this.posts = data;
        console.log("aaa"+this.posts)

      },
      error: (error) => {
        console.error('Error while downloading posts:', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  newPostContent: string = '';

  onPublish() {
    if (!this.newPostContent.trim()) {
      alert("Post content cannot be empty");
      return;
    }

    const newPost = { content: this.newPostContent };

    this.httpClient.post(`http://localhost:8080/api/posts/${this.username}`, newPost).subscribe({
      next: () => {
        console.log('Post added successfully');
        this.fetchPosts();
        this.newPostContent = '';
        window.location.reload();
      },
      error: (error) => {
        console.error('Error adding post:', error);
      }
    });
  }

  fetchPosts() {
    this.httpClient.get<Post[]>('http://localhost:8080/api/posts').subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }

  currentRoute: string = '';

  updateHeader() {
    this.currentRoute = this.router.url;
  }
}
