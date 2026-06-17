import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/services/data.service';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-tour-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './tour-detail.component.html'
})
export class TourDetailComponent implements OnInit {
  tour: any = null;
  notFound = false;
  booking = { travelers: 1, startDate: '', notes: '', contactName: '', contactEmail: '', contactPhone: '' };
  bookingMsg = '';
  bookingError = '';
  bookingLoading = false;
  activeTab = 'overview';

  constructor(private route: ActivatedRoute, private data: DataService, private api: ApiService, public auth: AuthService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.tour = this.data.tours.find(t => t.slug === id || t.id === id);
    if (!this.tour) { this.notFound = true; return; }
    const u = this.auth.currentUser();
    if (u) { this.booking.contactName = `${u.firstName} ${u.lastName}`; this.booking.contactEmail = u.email; }
    window.scrollTo(0, 0);
  }

  get totalPrice() { return this.tour ? this.tour.price * this.booking.travelers : 0; }

  submitBooking(): void {
    if (!this.auth.isLoggedIn()) { this.bookingError = 'Please sign in to book a tour.'; return; }
    this.bookingLoading = true;
    this.api.createBooking({ ...this.booking, tour: this.tour.slug }).subscribe({
      next: (r) => { this.bookingMsg = r.message; this.bookingLoading = false; },
      error: (e) => { this.bookingError = e.error?.message || 'Booking failed.'; this.bookingLoading = false; }
    });
  }
}
