import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-admin-messages',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './admin-messages.component.html'
})
export class AdminMessagesComponent implements OnInit {
  messages: any[] = [];
  loading = false;
  selected: any = null;
  filterStatus = 'all';
  successMsg = '';

  get filtered() {
    if (this.filterStatus === 'all') return this.messages;
    return this.messages.filter(m => m.status === this.filterStatus);
  }
  get newCount() { return this.messages.filter(m => m.status === 'new').length; }

  constructor(private api: ApiService) {}
  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.api.getContacts().subscribe({
      next: (d) => { this.messages = d; this.loading = false; },
      error: () => { this.messages = this.sampleMessages; this.loading = false; }
    });
  }

  open(m: any): void {
    this.selected = m;
    if (m.status === 'new') this.updateStatus(m, 'read');
  }
  close(): void { this.selected = null; }

  updateStatus(m: any, status: string): void {
    m.status = status;
    this.api.updateContactStatus(m._id || m.id, status).subscribe({ error: () => {} });
  }

  deleteMsg(m: any): void {
    this.api.deleteContact(m._id || m.id).subscribe({
      next: () => { this.messages = this.messages.filter(x => x !== m); this.selected = null; this.successMsg = 'Message deleted.'; setTimeout(() => this.successMsg = '', 3000); },
      error: () => { this.messages = this.messages.filter(x => x !== m); this.selected = null; }
    });
  }

  readonly sampleMessages = [
    { id: 'sm1', name: 'Sophie Martin', email: 'sophie@example.com', subject: 'Sahara Tour Inquiry', message: 'Hello! I would like to know more about your Sahara Adventure package for 2 people in October. Can you provide pricing and availability?', status: 'new', phone: '+33 6 12 34 56 78', createdAt: new Date(Date.now() - 3600000).toISOString() },
    { id: 'sm2', name: 'James Chen', email: 'james@example.com', subject: 'Honeymoon Package', message: 'My fiancée and I are planning our honeymoon for June 2025. We\'re interested in a luxury experience combining Sidi Bou Said with Djerba. Budget around €3000 per person.', status: 'read', phone: '+44 7700 900000', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: 'sm3', name: 'Anna Müller', email: 'anna@example.com', subject: 'Group Booking (12 people)', message: 'I am organizing a cultural group tour for 12 people from Germany. We are interested in visiting Carthage, Kairouan, and the Sahara. Could you prepare a custom quote?', status: 'replied', phone: '+49 171 234 5678', createdAt: new Date(Date.now() - 172800000).toISOString() },
  ];
}
