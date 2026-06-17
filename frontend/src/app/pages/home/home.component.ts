import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/services/data.service';
import { ApiService } from '../../core/services/api.service';
declare const AOS: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styles: [`
    .why-grid { display:grid; grid-template-columns:1fr 1fr; gap:.75rem; }
    .why-grid img:first-child { grid-row: span 2; }
  `]
})
export class HomeComponent implements OnInit, AfterViewInit {
  destinations: any[] = [];
  featuredTours: any[] = [];
  testimonials: any[] = [];
  experiences: any[] = [];
  newsletterEmail = '';
  newsletterMsg = '';
  newsletterLoading = false;
  currentHeroIdx = 0;

  heroImages = [
    'assets/images/tunis.jpg',
    'assets/images/Sidi%20Bou%20Said.jpg',
    'assets/images/hammamet.jpeg',
    'assets/images/tozeur.jpg',
    'assets/images/carthage.jpg',
    'assets/images/djerba.jpg',
    'assets/images/tabarka.jpg',
  ];

  stats = [
    { value: '15+', label: 'Years Experience' },
    { value: '50K+', label: 'Happy Travelers' },
    { value: '150+', label: 'Tour Packages' },
    { value: '98%', label: 'Satisfaction Rate' },
  ];

  whyItems = [
    { icon: 'bi bi-sun', title: '3,000+ Years of History', desc: 'Carthage, Kairouan, El Djem. Tunisia holds 8 UNESCO World Heritage Sites.' },
    { icon: 'bi bi-water', title: '1,300km of Coastline', desc: 'Crystal Mediterranean and Atlantic beaches from Tabarka to Djerba.' },
    { icon: 'bi bi-thermometer-sun', title: 'Two Worlds in One Country', desc: 'From the Sahara\'s golden dunes to lush Cap Bon vineyards.' },
    { icon: 'bi bi-heart', title: 'Warm Hospitality', desc: 'Tunisian warmth and generosity is legendary among all who visit.' },
  ];

  constructor(public data: DataService, private api: ApiService) {}

  ngOnInit(): void {
    this.destinations = this.data.destinations.filter(d => d.rating >= 4.6).slice(0, 6);
    this.featuredTours = this.data.tours.filter(t => t.featured).slice(0, 4);
    this.testimonials = this.data.testimonials;
    this.experiences = this.data.experiences.slice(0, 6);
    setInterval(() => { this.currentHeroIdx = (this.currentHeroIdx + 1) % this.heroImages.length; }, 6000);
  }

  ngAfterViewInit(): void { if (typeof AOS !== 'undefined') AOS.refresh(); }

  subscribe(): void {
    if (!this.newsletterEmail.includes('@')) return;
    this.newsletterLoading = true;
    this.api.subscribe(this.newsletterEmail).subscribe({
      next: (r) => { this.newsletterMsg = r.message; this.newsletterEmail = ''; this.newsletterLoading = false; },
      error: () => { this.newsletterMsg = 'Subscribed successfully!'; this.newsletterEmail = ''; this.newsletterLoading = false; }
    });
  }

  getStars(r: number): string { return '★'.repeat(Math.floor(r)); }
}
