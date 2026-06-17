import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-admin-destinations',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './admin-destinations.component.html'
})
export class AdminDestinationsComponent implements OnInit {
  destinations: any[] = [];
  loading = false;
  showForm = false;
  editing: any = null;
  saving = false;
  deleteConfirm: string | null = null;
  successMsg = '';

  form: any = { name: '', region: 'North', shortDesc: '', description: '', coverImage: '', bestSeason: '', tags: '' };
  regions = ['North', 'Sahel', 'Cap Bon', 'South', 'Island'];

  constructor(private api: ApiService, private data: DataService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    // Try API first, fall back to static data
    this.api.getDestinations().subscribe({
      next: (d) => { this.destinations = d; this.loading = false; },
      error: () => { this.destinations = this.data.destinations; this.loading = false; }
    });
  }

  openNew(): void { this.form = { name: '', region: 'North', shortDesc: '', description: '', coverImage: '', bestSeason: '', tags: '' }; this.editing = null; this.showForm = true; }
  openEdit(d: any): void { this.form = { ...d, tags: Array.isArray(d.tags) ? d.tags.join(', ') : d.tags || '' }; this.editing = d; this.showForm = true; }
  closeForm(): void { this.showForm = false; this.editing = null; }

  save(): void {
    this.saving = true;
    const payload = { ...this.form, tags: this.form.tags?.split(',').map((t: string) => t.trim()).filter(Boolean) };
    const obs = this.editing ? this.api.updateDestination(this.editing._id || this.editing.id, payload) : this.api.createDestination(payload);
    obs.subscribe({
      next: () => { this.successMsg = this.editing ? 'Destination updated!' : 'Destination created!'; this.closeForm(); this.load(); this.saving = false; setTimeout(() => this.successMsg = '', 3000); },
      error: (e) => { alert(e.error?.message || 'Error saving. Backend required.'); this.saving = false; }
    });
  }

  confirmDelete(id: string): void { this.deleteConfirm = id; }
  cancelDelete(): void { this.deleteConfirm = null; }
  doDelete(): void {
    if (!this.deleteConfirm) return;
    this.api.deleteDestination(this.deleteConfirm).subscribe({
      next: () => { this.successMsg = 'Deleted!'; this.load(); this.deleteConfirm = null; setTimeout(() => this.successMsg = '', 3000); },
      error: () => { this.deleteConfirm = null; }
    });
  }
}
