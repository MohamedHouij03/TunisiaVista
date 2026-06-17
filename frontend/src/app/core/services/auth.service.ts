import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiUrl;
  currentUser = signal<any>(null);

  constructor(private http: HttpClient, private router: Router) {
    const stored = localStorage.getItem('user');
    if (stored) this.currentUser.set(JSON.parse(stored));
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.base}/auth/register`, data).pipe(
      tap(res => this.storeAuth(res))
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.base}/auth/login`, { email, password }).pipe(
      tap(res => this.storeAuth(res))
    );
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.base}/auth/profile`).pipe(
      tap(user => { this.currentUser.set(user); localStorage.setItem('user', JSON.stringify(user)); })
    );
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put<any>(`${this.base}/auth/profile`, data).pipe(
      tap(res => { this.currentUser.set(res.user); localStorage.setItem('user', JSON.stringify(res.user)); })
    );
  }

  toggleSavedDestination(destId: string): Observable<any> {
    return this.http.post<any>(`${this.base}/auth/saved/${destId}`, {});
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const user = this.currentUser();
    return user?.role === 'admin';
  }

  private storeAuth(res: any): void {
    if (res.token) localStorage.setItem('token', res.token);
    if (res.user) {
      localStorage.setItem('user', JSON.stringify(res.user));
      this.currentUser.set(res.user);
    }
  }
}
