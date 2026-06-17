import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="back-to-top" [class.visible]="visible" (click)="scrollTop()" aria-label="Back to top">
      <i class="bi bi-arrow-up"></i>
    </button>
  `
})
export class BackToTopComponent {
  visible = false;

  @HostListener('window:scroll')
  onScroll(): void { this.visible = window.scrollY > 400; }

  scrollTop(): void { window.scrollTo({ top: 0, behavior: 'smooth' }); }
}
