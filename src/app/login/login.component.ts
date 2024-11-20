import {Component, OnDestroy} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Router, RouterLink, RouterOutlet} from '@angular/router';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalEnvironmentVariables} from '../models/globalEnvironmentVariables';

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



  constructor(private httpClient: HttpClient, private router:Router,private globalEnvironmentVariables: GlobalEnvironmentVariables) { }

  private subscription: Subscription | null = null;

  protected username!: string;
  protected password!: string;

  onSubmit() {
    const loginData = { username: this.username, password: this.password };


    this.subscription = this.httpClient.post<boolean>("http://localhost:8081/api/user/login", null, {
      params: loginData
    }).subscribe({
      next: (isValid: boolean) => {
        if (isValid) {
          sessionStorage.setItem('globalSession', 'true');
          sessionStorage.setItem('username', this.username);
          sessionStorage.setItem('password', this.password);
          this.globalEnvironmentVariables.setGlobalUsername(this.username);
          console.log("login successful!");
          this.router.navigate(['']);
          this.globalEnvironmentVariables.setGlobalSession(true)

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
