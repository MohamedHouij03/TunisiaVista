import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  stats: any = null;
  loading = true;
  today = new Date();

  navItems = [
    { label: 'Dashboard', icon: 'bi-speedometer2', route: '/admin/dashboard' },
    { label: 'Destinations', icon: 'bi-geo-alt', route: '/admin/destinations' },
    { label: 'Tours', icon: 'bi-suitcase', route: '/admin/tours' },
    { label: 'Blog Posts', icon: 'bi-journal-text', route: '/admin/blog' },
    { label: 'Messages', icon: 'bi-envelope', route: '/admin/messages' },
    { label: 'Bookings', icon: 'bi-calendar-check', route: '/admin/dashboard' },
  ];

  statCards = [
    { key: 'destinations', label: 'Destinations', icon: 'bi-geo-alt', color: '#1B4F8A', bg: 'rgba(27,79,138,.1)' },
    { key: 'tours', label: 'Tours', icon: 'bi-suitcase', color: '#C8955E', bg: 'rgba(200,149,94,.1)' },
    { key: 'users', label: 'Registered Users', icon: 'bi-people', color: '#0d9488', bg: 'rgba(13,148,136,.1)' },
    { key: 'bookings', label: 'Total Bookings', icon: 'bi-calendar-check', color: '#7c3aed', bg: 'rgba(124,58,237,.1)' },
    { key: 'newContacts', label: 'New Messages', icon: 'bi-envelope', color: '#dc2626', bg: 'rgba(220,38,38,.1)' },
    { key: 'newsletters', label: 'Subscribers', icon: 'bi-at', color: '#d97706', bg: 'rgba(217,119,6,.1)' },
    { key: 'blogPosts', label: 'Blog Posts', icon: 'bi-journal-richtext', color: '#0ea5e9', bg: 'rgba(14,165,233,.1)' },
    { key: 'totalRevenue', label: 'Total Revenue (TND)', icon: 'bi-cash-stack', color: '#D4AF37', bg: 'rgba(212,175,55,.1)' },
  ];

  constructor(private api: ApiService, public auth: AuthService) {}

  ngOnInit(): void {
    this.api.getAdminStats().subscribe({
      next: s => { this.stats = s; this.loading = false; },
      error: () => {
        // Fallback demo stats
        this.stats = { destinations: 15, tours: 5, users: 248, bookings: 67, newContacts: 3, newsletters: 892, blogPosts: 6, totalRevenue: 124500, recentBookings: [] };
        this.loading = false;
      }
    });
  }
}
