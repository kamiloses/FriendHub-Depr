import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostComponent} from './post/post.component';
import {Post} from '../models/post-model';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';

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
  private subscription: Subscription | null = null;  // Subskrypcja będzie przechowywana w tej zmiennej

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

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
    // Czyszczenie subskrypcji przy zniszczeniu komponentu
    if (this.subscription) {
      this.subscription.unsubscribe();  // Zapewnienie, że subskrypcja zostanie zakończona
      console.log('Subskrypcja została anulowana.');
    }
  }




}
