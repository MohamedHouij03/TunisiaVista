import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  form = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', phone: '' };
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    if (!this.form.firstName || !this.form.email || !this.form.password) { this.error = 'Please fill required fields.'; return; }
    if (this.form.password !== this.form.confirmPassword) { this.error = 'Passwords do not match.'; return; }
    if (this.form.password.length < 6) { this.error = 'Password must be at least 6 characters.'; return; }
    this.loading = true; this.error = '';
    const { confirmPassword, ...data } = this.form;
    this.auth.register(data).subscribe({
      next: () => { this.loading = false; this.router.navigate(['/']); },
      error: (e) => { this.error = e.error?.message || 'Registration failed. Please try again.'; this.loading = false; }
    });
  }
}
