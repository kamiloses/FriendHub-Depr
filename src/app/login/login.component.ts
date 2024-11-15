import {Component, OnDestroy} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Router, RouterLink, RouterOutlet} from '@angular/router';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{



  constructor(private httpClient: HttpClient, private router:Router) {}

  private subscription: Subscription | null = null;

  protected username!: string;
  protected password!: string;

  onSubmit() {
    const loginData = { username: this.username, password: this.password };

    this.subscription = this.httpClient.post<boolean>("http://localhost:7070/api/user/login", null, {
      params: loginData
    }).subscribe({
      next: (isValid: boolean) => {
        if (isValid) {
          console.log("login successful!");
          this.router.navigate(['']);

        } else {
          console.error("credentials invalid!");
        }
      },
      error: (error) => {
        console.error('error while trying to log in', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout(): void {
    localStorage.removeItem("token");
  }
  isUserLoggedIn(): boolean {
    if (localStorage.getItem("token") != null) {
      return true;
    }
    return false;
  }



}
