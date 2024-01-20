import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
interface User {
  id: number;
  userName: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Dating Client';
  users: User[] = [];
  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get<User[]>('https://localhost:5001/api/users').subscribe({
      next: (response: User[]) => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Request completed')
    })
  }
}
