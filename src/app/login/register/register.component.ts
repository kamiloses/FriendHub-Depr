import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Registration} from '../../models/registration-model';

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


  constructor(private httpClient: HttpClient){}

  onSubmit() {
    this.loggedUserData.username = this.username;
    this.loggedUserData.password = this.password;
    this.loggedUserData.firstName = this.firstName;
    this.loggedUserData.lastName = this.lastName;


    this.httpClient.post("http://localhost:8081/api/user/signup", this.loggedUserData).subscribe({
      next: (response) => {
        console.log('Post added successfully:', response);
      },
      error: (error) => {
        console.error('Error adding post:', error);
      },
      complete: () => {
        console.log('Post submission complete.');
      }
    });
  }
}
