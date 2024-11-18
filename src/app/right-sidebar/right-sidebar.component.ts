import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { User } from '../models/user-model';

@Component({
  selector: 'app-right-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css'], // Poprawiona nazwa
})
export class RightSidebarComponent implements OnInit, OnDestroy {
  private subscription: Subscription | null = null;
  protected friendDetails!: User[];

  constructor(private httpClient: HttpClient) {}

  isChatOpen = false; // Kontroluje widoczność okienka czatu

  ngOnInit(): void {
    this.subscription = this.httpClient
      .get<User[]>('http://localhost:8084/api/friends?username=marcin')
      .subscribe({
        next: (data) => {
          console.log(data);
          this.friendDetails = data;
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

  // Metody otwierania i zamykania czatu
  openChat(): void {
    this.isChatOpen = true;
  }

  closeChat(): void {
    this.isChatOpen = false;
  }
}
