import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interface/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  getToken() {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
  }

  setToken(token: string) {
    if (token) localStorage.setItem('token', JSON.stringify(token));
  }

  clearStorage() {
    localStorage.clear();
  }

  signUp(userData: User): Observable<any> {
    return this.httpClient.post(
      'http://localhost:3000/api/user/signup',
      userData
    );
  }

  login(userData: User): Observable<any> {
    return this.httpClient.post('http://localhost:3000/api/user/login', {
      email: userData.email,
      password: userData.password,
    });
  }
}
