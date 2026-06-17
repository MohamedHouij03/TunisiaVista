import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ── Destinations ─────────────────────────────────────────
  getDestinations(params?: any): Observable<any[]> {
    let p = new HttpParams();
    if (params) Object.keys(params).forEach(k => params[k] && (p = p.set(k, params[k])));
    return this.http.get<any[]>(`${this.base}/destinations`, { params: p });
  }
  getFeaturedDestinations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/destinations/featured`);
  }
  getDestination(id: string): Observable<any> {
    return this.http.get<any>(`${this.base}/destinations/${id}`);
  }
  createDestination(data: any): Observable<any> { return this.http.post<any>(`${this.base}/destinations`, data); }
  updateDestination(id: string, data: any): Observable<any> { return this.http.put<any>(`${this.base}/destinations/${id}`, data); }
  deleteDestination(id: string): Observable<any> { return this.http.delete<any>(`${this.base}/destinations/${id}`); }

  // ── Tours ─────────────────────────────────────────────────
  getTours(params?: any): Observable<any[]> {
    let p = new HttpParams();
    if (params) Object.keys(params).forEach(k => params[k] !== undefined && (p = p.set(k, params[k])));
    return this.http.get<any[]>(`${this.base}/tours`, { params: p });
  }
  getTour(id: string): Observable<any> { return this.http.get<any>(`${this.base}/tours/${id}`); }
  createTour(data: any): Observable<any> { return this.http.post<any>(`${this.base}/tours`, data); }
  updateTour(id: string, data: any): Observable<any> { return this.http.put<any>(`${this.base}/tours/${id}`, data); }
  deleteTour(id: string): Observable<any> { return this.http.delete<any>(`${this.base}/tours/${id}`); }

  // ── Blog ──────────────────────────────────────────────────
  getBlogPosts(params?: any): Observable<any> {
    let p = new HttpParams();
    if (params) Object.keys(params).forEach(k => params[k] !== undefined && (p = p.set(k, params[k])));
    return this.http.get<any>(`${this.base}/blog`, { params: p });
  }
  getBlogPost(id: string): Observable<any> { return this.http.get<any>(`${this.base}/blog/${id}`); }
  createBlogPost(data: any): Observable<any> { return this.http.post<any>(`${this.base}/blog`, data); }
  updateBlogPost(id: string, data: any): Observable<any> { return this.http.put<any>(`${this.base}/blog/${id}`, data); }
  deleteBlogPost(id: string): Observable<any> { return this.http.delete<any>(`${this.base}/blog/${id}`); }

  // ── Testimonials ──────────────────────────────────────────
  getTestimonials(params?: any): Observable<any[]> {
    let p = new HttpParams();
    if (params) Object.keys(params).forEach(k => params[k] !== undefined && (p = p.set(k, params[k])));
    return this.http.get<any[]>(`${this.base}/testimonials`, { params: p });
  }
  createTestimonial(data: any): Observable<any> { return this.http.post<any>(`${this.base}/testimonials`, data); }
  updateTestimonial(id: string, data: any): Observable<any> { return this.http.put<any>(`${this.base}/testimonials/${id}`, data); }
  deleteTestimonial(id: string): Observable<any> { return this.http.delete<any>(`${this.base}/testimonials/${id}`); }

  // ── Contact ───────────────────────────────────────────────
  sendContact(data: any): Observable<any> { return this.http.post<any>(`${this.base}/contact`, data); }
  getContacts(params?: any): Observable<any[]> {
    let p = new HttpParams();
    if (params) Object.keys(params).forEach(k => params[k] !== undefined && (p = p.set(k, params[k])));
    return this.http.get<any[]>(`${this.base}/contact`, { params: p });
  }
  updateContactStatus(id: string, status: string): Observable<any> { return this.http.put<any>(`${this.base}/contact/${id}`, { status }); }
  deleteContact(id: string): Observable<any> { return this.http.delete<any>(`${this.base}/contact/${id}`); }

  // ── Bookings ──────────────────────────────────────────────
  createBooking(data: any): Observable<any> { return this.http.post<any>(`${this.base}/bookings`, data); }
  getMyBookings(): Observable<any[]> { return this.http.get<any[]>(`${this.base}/bookings/my`); }
  getAllBookings(): Observable<any[]> { return this.http.get<any[]>(`${this.base}/bookings`); }
  updateBookingStatus(id: string, status: string): Observable<any> { return this.http.put<any>(`${this.base}/bookings/${id}`, { status }); }

  // ── Newsletter ────────────────────────────────────────────
  subscribe(email: string): Observable<any> { return this.http.post<any>(`${this.base}/newsletter/subscribe`, { email }); }
  getNewsletterList(): Observable<any[]> { return this.http.get<any[]>(`${this.base}/newsletter`); }

  // ── Admin ─────────────────────────────────────────────────
  getAdminStats(): Observable<any> { return this.http.get<any>(`${this.base}/admin/stats`); }
  getAdminUsers(): Observable<any[]> { return this.http.get<any[]>(`${this.base}/admin/users`); }
}
