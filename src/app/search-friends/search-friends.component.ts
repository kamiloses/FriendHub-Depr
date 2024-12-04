import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchedPeople} from '../models/searchedPeople-model';


@Component({
  selector: 'app-search-friends',
  standalone: true,
  imports: [],
  templateUrl: './search-friends.component.html',
  styleUrls: ['./search-friends.component.css']
})
export class SearchFriendsComponent implements OnInit {


  constructor(private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  private searchedUsername!: string
  private currentRoute!: string
  protected searchedPeopleData!:SearchedPeople[]

  ngOnInit(): void {
    this.currentRoute = this.router.url;

    const lastSlashIndex = this.currentRoute.lastIndexOf('/');
    this.searchedUsername = this.currentRoute.substring(lastSlashIndex + 1);

    console.log("Searched Username: " + this.searchedUsername)
    this.fetchUsers()
  }

  fetchUsers() {

    this.httpClient.get<SearchedPeople[]>(`http://localhost:8084/api/friends/`+this.searchedUsername).subscribe({
      next: (posts) => {
        this.searchedPeopleData = posts;
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }
}
