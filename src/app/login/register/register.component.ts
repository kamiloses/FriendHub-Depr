import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

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

  onSubmit() {
    console.log('Username:', this.username);
    console.log('First Name:', this.firstName);
    console.log('Last Name:', this.lastName);
    console.log('Password:', this.password);
}


}
