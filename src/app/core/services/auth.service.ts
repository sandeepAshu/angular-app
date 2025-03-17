// src/app/core/services/auth.service.ts
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSignal = signal(false);
  private usernameSignal = signal('');
  private mockUser = {
    username: 'admin',
    password: 'Admin@123',
  };
  
  constructor(private router:Router){}

  login(credentials:any) {
    console.log(credentials)
    if (credentials.username===this.mockUser.username && credentials.password===this.mockUser.password) {
      this.isAuthenticatedSignal.set(true);
      this.usernameSignal.set(credentials.username);
      localStorage.setItem('currentUser', credentials.username);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticatedSignal.set(false);
    this.usernameSignal.set('');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.isAuthenticatedSignal;
  }

  checkAuthentication(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.isAuthenticatedSignal.set(true);
      this.usernameSignal.set(storedUser);
    }
  }
}