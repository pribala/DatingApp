import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
interface Users {
  id: number;
  userName: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  registerMode = false;
  users: Users[] = [];
  constructor(    private http: HttpClient,
    ) {}

  ngOnInit() {
    this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  getUsers() {
    this.http.get<Users[]>('https://localhost:5001/api/users').subscribe({
      next: (response: Users[]) => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Request completed')
    })
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
