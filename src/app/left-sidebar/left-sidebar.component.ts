import {Component, OnInit} from '@angular/core';
import {GlobalEnvironmentVariables} from '../models/globalEnvironmentVariables';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css'
})
export class LeftSidebarComponent implements OnInit {


  constructor(private globalEnvironmentVariables: GlobalEnvironmentVariables, private router: Router) {
  }

  protected myUsername!: string | null;

  ngOnInit() {
    this.myUsername = sessionStorage.getItem('username')||"fail"

  }


  logout(): void {

    sessionStorage.clear();
    localStorage.clear();

    this.globalEnvironmentVariables.setGlobalToken(null);
    this.globalEnvironmentVariables.setGlobalUsername(null);
    this.globalEnvironmentVariables.setGlobalSession(false);
    
    this.router.navigate(['/login']).then(r => console.log("successfully logged out."));

  }


}
