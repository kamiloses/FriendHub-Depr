import { Component } from '@angular/core';
import {PostsListComponent} from '../../posts-list/posts-list.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    PostsListComponent,
    NgClass
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

}
