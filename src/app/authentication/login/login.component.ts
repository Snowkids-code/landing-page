import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private http: HttpClient, private router:Router) {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password,
    };

    const apiUrl = 'http://127.0.0.1:8000/api/login/';

    this.http.post(apiUrl, loginData).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        this.router.navigate(['/'])
        console.error(error);
      },
    });
  }
}
