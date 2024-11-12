import { Routes } from '@angular/router';
import {PostComponent} from './posts-list/post/post.component';

export const routes: Routes = [
  { path: 'post/:id', component: PostComponent }]

