import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-search-friends',
  standalone: true,
  imports: [],
  templateUrl: './search-friends.component.html',
  styleUrls: ['./search-friends.component.css']
})
export class SearchFriendsComponent implements OnInit {


  constructor(private httpClient: HttpClient,private router: Router, private activatedRoute: ActivatedRoute) {}
  private searchedUsername!:string
  private currentRoute!:string

  ngOnInit(): void {
    this.currentRoute = this.router.url;

      const lastSlashIndex = this.currentRoute.lastIndexOf('/');
      this.searchedUsername = this.currentRoute.substring(lastSlashIndex + 1);

       console.log("Searched Username: " +this.searchedUsername)
  }

  fetchUsers() {

    this.httpClient.get<any[]>(`http://localhost:8080/`).subscribe({
      next: (posts) => {
        console.log('Posts fetched successfully', posts);
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }

  onPublish() {
    if (!this.newPostContent.trim()) {
      alert("Post content cannot be empty");
      return;
    }

    const newPost = { content: this.newPostContent };

    this.httpClient.post(`http://localhost:8080/api/posts/${this.username}`, newPost).subscribe({
      next: () => {
        console.log('Post added successfully');
        this.fetchPosts();  // Fetch posts again after publishing a new one.
        this.newPostContent = '';
      },
      error: (error) => {
        console.error('Error adding post:', error);
      }
    });
  }
}
