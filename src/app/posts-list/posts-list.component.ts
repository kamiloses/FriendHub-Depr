import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostComponent} from './post/post.component';
import {Post} from '../models/post-model';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [
    PostComponent
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
    this.updateHeader();
    this.subscription = this.httpClient.get<Post[]>("http://localhost:8080/api/posts").subscribe({
      next: (data) => {
        console.log(data);
        this.posts = data;
      },
      error: (error) => {
        console.error('Błąd podczas pobierania danych:', error);
      }
    });
  }

  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('Subskrypcja została anulowana.');
    }
  }


  currentRoute!: string;





  updateHeader() {
    this.currentRoute = this.router.url;
  }


}
