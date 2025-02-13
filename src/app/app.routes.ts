import { Routes } from '@angular/router';
import {PostComponent} from './posts-list/post/post.component';
import {PostDetailComponent} from './posts-list/post/post-detail/post-detail.component';
import {PostsListComponent} from './posts-list/posts-list.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './login/register/register.component';
import {authGuard} from './auth.guard';
import {SearchFriendsComponent} from './search-friends/search-friends.component';
import {UserProfileComponent} from './left-sidebar/user-profile/user-profile.component';

export const routes: Routes = [

  { path: '',component: PostsListComponent,canActivate:[authGuard] },
  { path: 'user/:username/post/:id', component: PostDetailComponent,canActivate:[authGuard] },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'search/:username',component: SearchFriendsComponent},
  {path: 'profile/kamiloses',component:UserProfileComponent}

]

