import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {RightSidebarComponent} from './right-sidebar/right-sidebar.component';
import {PostsListComponent} from './posts-list/posts-list.component';
import {filter} from 'rxjs';
import {NgClass} from '@angular/common';
import {WebSocketService} from './WebSocketService';
import {GlobalEnvironmentVariables} from './models/globalEnvironmentVariables';
import {LeftSidebarComponent} from './left-sidebar/left-sidebar.component';
import {UserProfileComponent} from './user-profile/user-profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, RightSidebarComponent, PostsListComponent, NgClass, LeftSidebarComponent, UserProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'FriendHub';


  currentRoute: string = '';
  constructor(private router: Router, private websocketService: WebSocketService,private globalEnvironment:GlobalEnvironmentVariables) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
      console.log("Current endpoint " + this.currentRoute);
      this.globalEnvironment.setCurrentRoute(this.currentRoute);



    });
  }




}











