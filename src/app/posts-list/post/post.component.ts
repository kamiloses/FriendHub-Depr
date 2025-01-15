import {Component, Input} from '@angular/core';
import {Post} from '../../models/post-model';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent  {

  @Input({required:true}) postDetails!:Post


  protected readonly JSON = JSON;
}
