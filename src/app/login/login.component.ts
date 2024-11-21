import {Component, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import {GlobalEnvironmentVariables} from '../models/globalEnvironmentVariables';
import {Subscription} from 'rxjs';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private globalEnvironmentVariables: GlobalEnvironmentVariables
  ) {
  }

  private subscription: Subscription | null = null;
  protected username!: string;
  protected password!: string;

  onSubmit() {
      localStorage.setItem('username', this.username);

    const loginData = {username: this.username, password: this.password};

    this.subscription = this.httpClient.post<any>("http://localhost:7070/api/login", loginData).subscribe({
      next: (response: any) => {
        if (response.token) {
          this.globalEnvironmentVariables.setGlobalToken(response.token);

          this.globalEnvironmentVariables.setGlobalUsername(this.username);

          this.globalEnvironmentVariables.setGlobalSession(true);

          console.log("Login successful!");
          this.router.navigate(['']);
        } else {
          console.error("Credentials invalid!");
        }
      },
      error: (error) => {
        console.error('Error while trying to log in', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout(): void {
    this.globalEnvironmentVariables.setGlobalToken(null);
    this.globalEnvironmentVariables.setGlobalUsername(null);
    this.globalEnvironmentVariables.setGlobalSession(false);
    console.log('Logged out successfully.');
  }

  isUserLoggedIn(): boolean {
    const token = this.globalEnvironmentVariables.getGlobalTokenValue();
    return token !== null;
  }
}
