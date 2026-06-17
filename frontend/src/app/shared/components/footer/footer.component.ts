import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
<footer class="footer-main">
  <div class="container">
    <div class="row g-4">

      <!-- Brand -->
      <div class="col-lg-4 col-md-6">
        <div class="footer-brand mb-3">
          <span style="font-family:var(--font-heading);font-size:1.6rem;font-weight:700;color:white;">
            Tunisia<span style="color:var(--clr-secondary);">Vista</span>
          </span>
        </div>
        <p style="font-size:.875rem; line-height:1.7; max-width:280px;">
          Your premium gateway to the wonders of Tunisia, from the Mediterranean coast to the Saharan dunes.
          Authentic, curated, unforgettable.
        </p>
        <div class="social-links mt-3">
          <a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
          <a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
          <a href="#" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
          <a href="#" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
          <a href="#" aria-label="TripAdvisor"><i class="bi bi-star"></i></a>
        </div>
        <!-- Awards -->
        <div class="d-flex gap-2 mt-3 flex-wrap">
          <div class="footer-badge"><i class="bi bi-award me-1"></i>Best Tour 2024</div>
          <div class="footer-badge"><i class="bi bi-patch-check me-1"></i>Certified Agency</div>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="col-lg-2 col-md-6 col-6">
        <h5>Discover</h5>
        <a routerLink="/destinations" class="footer-link">All Destinations</a>
        <a routerLink="/tours" class="footer-link">Tour Packages</a>
        <a routerLink="/experiences" class="footer-link">Experiences</a>
        <a routerLink="/gallery" class="footer-link">Photo Gallery</a>
        <a routerLink="/blog" class="footer-link">Travel Blog</a>
      </div>

      <!-- Company -->
      <div class="col-lg-2 col-md-6 col-6">
        <h5>Company</h5>
        <a routerLink="/about" class="footer-link">About Agency</a>
        <a routerLink="/about-tunisia" class="footer-link">About Tunisia</a>
        <a routerLink="/contact" class="footer-link">Contact Us</a>
        <a routerLink="/blog" class="footer-link">News & Blog</a>
        <a href="#" class="footer-link">Privacy Policy</a>
        <a href="#" class="footer-link">Terms of Service</a>
      </div>

      <!-- Contact + Newsletter -->
      <div class="col-lg-4 col-md-6">
        <h5>Stay Connected</h5>
        <div class="mb-3">
          <div class="d-flex align-items-start gap-2 mb-2">
            <i class="bi bi-geo-alt mt-1" style="color:var(--clr-secondary); flex-shrink:0;"></i>
            <span style="font-size:.875rem;">Av. Habib Bourguiba, Tunis 1000, Tunisia</span>
          </div>
          <div class="d-flex align-items-center gap-2 mb-2">
            <i class="bi bi-telephone" style="color:var(--clr-secondary);"></i>
            <a href="tel:+21671000000" style="font-size:.875rem; color:rgba(255,255,255,.8); text-decoration:none;" class="footer-link" >+216 00 000 000</a>
          </div>
          <div class="d-flex align-items-center gap-2 mb-2">
            <i class="bi bi-envelope" style="color:var(--clr-secondary);"></i>
            <a href="mailto:hello&#64;tunisiavista.com" style="font-size:.875rem; color:rgba(255,255,255,.8); text-decoration:none;" class="footer-link">hello&#64;tunisiavista.com</a>
          </div>
        </div>
        <p style="font-size:.82rem; margin-bottom:.6rem; font-weight:600; color:rgba(255,255,255,.85);">Subscribe to our newsletter</p>
        <div class="d-flex gap-2">
          <input type="email" class="form-control form-control-sm" placeholder="Your email address"
                 [(ngModel)]="email" style="background:rgba(255,255,255,.1); border-color:rgba(255,255,255,.2); color:white; border-radius:50px; flex:1;">
          <button class="btn btn-sm btn-gold px-3" style="border-radius:50px; white-space:nowrap;" (click)="subscribe()" [disabled]="subscribing">
            <i class="bi bi-send me-1" *ngIf="!subscribing"></i>
            <span class="spinner-border spinner-border-sm me-1" *ngIf="subscribing"></span>
            Subscribe
          </button>
        </div>
        <div *ngIf="subscribeMsg" class="mt-2 small" [class.text-success]="subscribeSuccess" [class.text-warning]="!subscribeSuccess" style="font-size:.78rem;">
          {{subscribeMsg}}
        </div>
      </div>
    </div>

    <hr class="footer-divider">

    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 footer-bottom">
      <span>© {{year}} TunisiaVista. All rights reserved. Made with <i class="bi bi-heart-fill" style="color:var(--clr-secondary);"></i> for Tunisia.</span>
      <div class="d-flex gap-3">
        <a href="#" style="color:rgba(255,255,255,.4); text-decoration:none; font-size:.8rem; transition:var(--transition);" class="footer-link">Privacy</a>
        <a href="#" style="color:rgba(255,255,255,.4); text-decoration:none; font-size:.8rem; transition:var(--transition);" class="footer-link">Terms</a>
        <a href="#" style="color:rgba(255,255,255,.4); text-decoration:none; font-size:.8rem; transition:var(--transition);" class="footer-link">Sitemap</a>
      </div>
    </div>
  </div>
</footer>
  `,
  styles: [`
    .footer-badge {
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: var(--radius-full);
      padding: .25rem .75rem;
      font-size: .7rem;
      color: rgba(255,255,255,.7);
      font-weight: 600;
    }
    .form-control::placeholder { color: rgba(255,255,255,.5) !important; }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
  email = '';
  subscribing = false;
  subscribeMsg = '';
  subscribeSuccess = false;

  constructor(private api: ApiService) {}

  subscribe(): void {
    if (!this.email) return;
    this.subscribing = true;
    this.api.subscribe(this.email).subscribe({
      next: (res) => {
        this.subscribeMsg = res.message || 'Subscribed successfully!';
        this.subscribeSuccess = true;
        this.email = '';
        this.subscribing = false;
      },
      error: (err) => {
        this.subscribeMsg = err.error?.message || 'Could not subscribe at this time.';
        this.subscribeSuccess = false;
        this.subscribing = false;
      }
    });
  }
}
