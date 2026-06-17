import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'destinations', loadComponent: () => import('./pages/destinations/destinations.component').then(m => m.DestinationsComponent) },
  { path: 'destinations/:id', loadComponent: () => import('./pages/destination-detail/destination-detail.component').then(m => m.DestinationDetailComponent) },
  { path: 'experiences', loadComponent: () => import('./pages/experiences/experiences.component').then(m => m.ExperiencesComponent) },
  { path: 'tours', loadComponent: () => import('./pages/tours/tours.component').then(m => m.ToursComponent) },
  { path: 'tours/:id', loadComponent: () => import('./pages/tour-detail/tour-detail.component').then(m => m.TourDetailComponent) },
  { path: 'about-tunisia', loadComponent: () => import('./pages/about-tunisia/about-tunisia.component').then(m => m.AboutTunisiaComponent) },
  { path: 'about', loadComponent: () => import('./pages/about-agency/about-agency.component').then(m => m.AboutAgencyComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'blog', loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent) },
  { path: 'blog/:id', loadComponent: () => import('./pages/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent) },
  { path: 'gallery', loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent) },
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'profile', canActivate: [authGuard], loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent) },
  { path: 'my-bookings', canActivate: [authGuard], loadComponent: () => import('./pages/bookings/bookings.component').then(m => m.BookingsComponent) },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'destinations', loadComponent: () => import('./admin/admin-destinations/admin-destinations.component').then(m => m.AdminDestinationsComponent) },
      { path: 'tours', loadComponent: () => import('./admin/admin-tours/admin-tours.component').then(m => m.AdminToursComponent) },
      { path: 'blog', loadComponent: () => import('./admin/admin-blog/admin-blog.component').then(m => m.AdminBlogComponent) },
      { path: 'messages', loadComponent: () => import('./admin/admin-messages/admin-messages.component').then(m => m.AdminMessagesComponent) }
    ]
  },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
