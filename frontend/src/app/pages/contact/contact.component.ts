import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
@Component({ selector:'app-contact', standalone:true, imports:[CommonModule,RouterLink,FormsModule], templateUrl:'./contact.component.html' })
export class ContactComponent {
  form = { name:'', email:'', phone:'', subject:'', message:'' };
  submitting = false; successMsg = ''; errorMsg = '';
  faqs = [
    { q:'How do I book a tour?', a:'Browse our tours, select your preferred package, and click "Request Booking". Our team confirms within 24 hours.' },
    { q:'What\'s included in the tour price?', a:'Each tour has a detailed includes/excludes list. Most include accommodation, guides, and transport as specified.' },
    { q:'Can I customize an itinerary?', a:'Absolutely! Contact us and our experts will design a bespoke itinerary tailored to your interests and schedule.' },
    { q:'What are the payment options?', a:'We accept bank transfers, credit cards, and PayPal. A 30% deposit confirms your booking.' },
    { q:'Is Tunisia safe for tourists?', a:'Tunisia is a stable, welcoming destination popular with millions of tourists annually. Standard travel precautions apply.' },
  ];
  activeAccordion = -1;
  constructor(private api: ApiService) {}
  submit(): void {
    if (!this.form.name || !this.form.email || !this.form.subject || !this.form.message) { this.errorMsg = 'Please fill all required fields.'; return; }
    this.submitting = true; this.errorMsg = '';
    this.api.sendContact(this.form).subscribe({
      next: (r) => { this.successMsg = r.message; this.submitting = false; this.form = { name:'', email:'', phone:'', subject:'', message:'' }; },
      error: (e) => { this.errorMsg = e.error?.message || 'Failed to send message.'; this.submitting = false; }
    });
  }
  toggleAccordion(i: number): void { this.activeAccordion = this.activeAccordion === i ? -1 : i; }
}
