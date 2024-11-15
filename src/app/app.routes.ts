import { Routes } from '@angular/router';
import {PostComponent} from './posts-list/post/post.component';
import {PostDetailComponent} from './posts-list/post/post-detail/post-detail.component';
import {PostsListComponent} from './posts-list/posts-list.component';
import {UserProfileComponent} from './user/user-profile/user-profile.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './login/register/register.component';

export const routes: Routes = [

  { path: '', component: PostsListComponent },
  { path: 'user/:username/post/:id', component: PostDetailComponent },
  {path: 'user/:name', component: UserProfileComponent  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

]

