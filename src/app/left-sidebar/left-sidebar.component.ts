import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {GlobalEnvironmentVariables} from '../models/globalEnvironmentVariables';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css'
})
export class LeftSidebarComponent {
     constructor( private globalEnvironmentVariables: GlobalEnvironmentVariables) {}

  logout(): void {

    sessionStorage.clear();
    localStorage.clear();

    this.globalEnvironmentVariables.setGlobalToken(null);
    this.globalEnvironmentVariables.setGlobalUsername(null);
    this.globalEnvironmentVariables.setGlobalSession(false);

  }
}
