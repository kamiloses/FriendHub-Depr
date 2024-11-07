import { Component } from '@angular/core';
import {PostComponent} from './post/post.component';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [
    PostComponent
  ],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
export class PostsListComponent {

}
