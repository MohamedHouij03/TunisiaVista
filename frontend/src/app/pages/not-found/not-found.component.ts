import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="min-height:80vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:2rem;background:var(--clr-off-white);">
      <div>
        <div style="font-size:8rem;font-weight:900;font-family:var(--font-heading);color:var(--clr-sand-dk);line-height:1;">404</div>
        <h1 style="font-family:var(--font-heading);color:var(--clr-navy);margin-bottom:1rem;">Page Not Found</h1>
        <p style="color:var(--clr-text-muted);max-width:400px;margin:0 auto 2rem;">
          Looks like this page has wandered off into the Sahara. Let us guide you back.
        </p>
        <a routerLink="/" class="btn btn-primary btn-lg me-3">
          <i class="bi bi-house me-2"></i>Go Home
        </a>
        <a routerLink="/destinations" class="btn btn-outline-primary btn-lg">
          <i class="bi bi-geo-alt me-2"></i>Explore Tunisia
        </a>
      </div>
    </div>
  `
})
export class NotFoundComponent {}
