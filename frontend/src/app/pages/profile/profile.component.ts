import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
@Component({ selector:'app-profile', standalone:true, imports:[CommonModule,RouterLink,FormsModule], templateUrl:'./profile.component.html' })
export class ProfileComponent implements OnInit {
  user: any = null; form: any = {}; saving = false; successMsg = '';
  constructor(private auth: AuthService) {}
  ngOnInit(): void { this.user = this.auth.currentUser(); this.form = { firstName: this.user?.firstName||'', lastName: this.user?.lastName||'', phone: this.user?.phone||'' }; }
  save(): void { this.saving = true; this.auth.updateProfile(this.form).subscribe({ next: () => { this.successMsg = 'Profile updated!'; this.user = this.auth.currentUser(); this.saving = false; }, error: () => this.saving = false }); }
}
