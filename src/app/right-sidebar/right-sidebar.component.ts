import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { User } from '../models/user-model';
import {NgIf, NgStyle} from '@angular/common';
import {Message} from '../models/message-model';

@Component({
  selector: 'app-right-sidebar',
  standalone: true,
  imports: [
    NgStyle,
    NgIf
  ],
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css'],
})
export class RightSidebarComponent implements OnInit, OnDestroy {
  private subscription: Subscription | null = null;
  protected friendDetails!: User[];
  protected  messageDetails!: Message[];

  constructor(private httpClient: HttpClient) {}

  isChatOpen = false;
  chatPosition: { top: number; left: number } | null = null;
  ngOnInit(): void {
    const storedUsername = localStorage.getItem('username');
    console.log("istnieje ?"+storedUsername);
    this.subscription = this.httpClient
      .get<User[]>('http://localhost:8084/api/friends?username='+storedUsername)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.friendDetails = data;
        },
        error: (error) => {
          console.error('Error while downloading data:', error);
        },
      });






    this.subscription = this.httpClient
      .get<Message[]>('http://localhost:8084/api/friends?username='+storedUsername)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.messageDetails = data;
        },
        error: (error) => {
          console.error('Error while downloading data:', error);
        },
      });






  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
   friend!:User;
  openChat(friendDetails:User): void {

this.friend=friendDetails
    this.chatPosition = {
      top: 420,
      left:1250 ,
    };
    this.isChatOpen = true;
  }

  closeChat(): void {
    this.isChatOpen = false;
    this.chatPosition = null;
  }
}
