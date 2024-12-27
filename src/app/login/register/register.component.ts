import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Registration} from '../../models/registration-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';

  loggedUserData: Registration = {
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  };


  constructor(private httpClient: HttpClient, private router: Router) {}

  onSubmit() {
    this.loggedUserData.username = this.username;
    this.loggedUserData.password = this.password;
    this.loggedUserData.firstName = this.firstName;
    this.loggedUserData.lastName = this.lastName;


    this.httpClient.post("http://localhost:8081/api/user/signup", this.loggedUserData).subscribe({
      next: (response) => {
        console.log('HTTP request successful:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        if (Array.isArray(error.error)) {
          console.log("error");
          this.getErrorMessage(error.error);
        }
      }
    });
    }

  getErrorMessage(errors: string[]) {
   this.firstNameError=''
   this.lastNameError=''
   this.usernameError=''
   this.passwordError=''


    const error1 = errors.find(e => e.includes("First Name"));
    if (error1) {
      this.firstNameError = error1;
    }
    const error2 = errors.find(e => e.includes("Last Name"));
    if (error2) {
      this.lastNameError = error2;
    }
    const error3 = errors.find(e => e.includes("Username"));
    if (error3) {
      this.usernameError = error3;
    }
    const error4 = errors.find(e => e.includes("Password"));
    if (error4) {
      this.passwordError = error4;
    }


  }


  firstNameError: string = '';
  lastNameError: string = '';
  usernameError: string = '';
  passwordError: string = '';


}
