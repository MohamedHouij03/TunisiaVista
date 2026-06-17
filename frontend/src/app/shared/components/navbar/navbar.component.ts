import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.component.html',
  styles: [`
    .mega-link { font-size:.875rem; color:var(--clr-text); padding:.3rem 0; font-weight:500; transition:var(--transition); }
    .mega-link:hover { color:var(--clr-primary); padding-left:.4rem; }
    .mega-link-dest { font-size:.875rem; color:var(--clr-text); font-weight:500; transition:var(--transition); }
    .mega-link-dest:hover { color:var(--clr-primary); }
    .mega-dest-dot { width:6px; height:6px; border-radius:50%; background:var(--clr-secondary); flex-shrink:0; }
    .icon-btn { padding:.45rem .6rem; color:var(--clr-text); border-radius:var(--radius-md); background:transparent; border:1.5px solid transparent; }
    .icon-btn:hover { background:var(--clr-off-white); color:var(--clr-primary); border-color:var(--clr-border); }
    .user-avatar { width:34px; height:34px; border-radius:50%; background:var(--clr-primary); color:white; display:flex; align-items:center; justify-content:center; font-size:.75rem; font-weight:700; }
    .user-avatar-btn { background:transparent; padding:.25rem; }
    .search-overlay { background:white; border-top:1px solid var(--clr-border); display:none; }
    .search-overlay.open { display:block; }
    .offcanvas-nav-link { display:flex; align-items:center; padding:.85rem 1.5rem; color:var(--clr-text); text-decoration:none; font-size:.9rem; font-weight:500; transition:var(--transition); }
    .offcanvas-nav-link:hover { color:var(--clr-primary); background:var(--clr-off-white); }
    .fw-600 { font-weight:600; }
  `]
})
export class NavbarComponent {
  scrolled = false;
  searchOpen = false;
  searchQuery = '';

  quickDests = [
    { id: 'tunis', name: 'Tunis' },
    { id: 'sidi-bou-said', name: 'Sidi Bou Said' },
    { id: 'hammamet', name: 'Hammamet' },
    { id: 'sousse', name: 'Sousse' },
    { id: 'tozeur', name: 'Tozeur' },
    { id: 'djerba', name: 'Djerba' },
    { id: 'carthage', name: 'Carthage' },
    { id: 'douz', name: 'Douz' },
  ];

  constructor(public auth: AuthService) {}

  @HostListener('window:scroll')
  onScroll(): void { this.scrolled = window.scrollY > 60; }

  toggleSearch(): void { this.searchOpen = !this.searchOpen; }
  logout(): void { this.auth.logout(); }

  get user() { return this.auth.currentUser(); }
  get isLoggedIn() { return this.auth.isLoggedIn(); }
  get isAdmin() { return this.auth.isAdmin(); }
}
