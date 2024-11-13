import { Component } from '@angular/core';
import {PostsListComponent} from '../../posts-list/posts-list.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    PostsListComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

}
