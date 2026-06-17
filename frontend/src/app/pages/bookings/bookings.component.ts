import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
@Component({ selector:'app-bookings', standalone:true, imports:[CommonModule,RouterLink], templateUrl:'./bookings.component.html' })
export class BookingsComponent implements OnInit {
  bookings: any[] = []; loading = true;
  constructor(private api: ApiService) {}
  ngOnInit(): void { this.api.getMyBookings().subscribe({ next: b => { this.bookings = b; this.loading = false; }, error: () => this.loading = false }); }
}
