import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {LeftSidebarComponent} from './left-sidebar/left-sidebar.component';
import {RightSidebarComponent} from './right-sidebar/right-sidebar.component';
import {PostsListComponent} from './posts-list/posts-list.component';
import {filter} from 'rxjs';
import {NgClass} from '@angular/common';
import {WebSocketService} from './WebSocketService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LeftSidebarComponent, RightSidebarComponent, PostsListComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'FriendHub';


  currentRoute: string = '';

  constructor(private router: Router, private websocketService: WebSocketService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
      console.log("Current endpoint " + this.currentRoute);
      this.handleRouteChange();
    });
  }

  private handleRouteChange(): void {

    if (this.currentRoute !== '/login'&& this.currentRoute !== '/register') {
      this.websocketService.connect();
      console.log("WebSocket connected for route: " + this.currentRoute);
    }
  }


  ngOnInit(): void {


  }



  ngOnDestroy(): void {

  }

}











