import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  currentRoute!: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(() => {
      this.updateHeader();
    });
  }

  ngOnInit(): void {
    this.updateHeader();
  }

  updateHeader() {
    this.currentRoute = this.router.url;
  }
}
