import { Component } from '@angular/core';
import {CommentsComponent} from './comments/comments.component';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    CommentsComponent
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent {

}
