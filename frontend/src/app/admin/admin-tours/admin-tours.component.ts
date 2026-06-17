import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-admin-tours',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './admin-tours.component.html'
})
export class AdminToursComponent implements OnInit {
  tours: any[] = [];
  loading = false;
  showForm = false;
  editing: any = null;
  saving = false;
  deleteConfirm: string | null = null;
  successMsg = '';

  form: any = { name: '', category: 'Cultural', price: '', duration: '', difficulty: 'Easy', shortDesc: '', description: '', coverImage: '', includes: '', excludes: '' };
  categories = ['Cultural', 'Adventure', 'Beach', 'Desert', 'City', 'Luxury'];
  difficulties = ['Easy', 'Moderate', 'Challenging'];

  constructor(private api: ApiService, private data: DataService) {}
  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.api.getTours().subscribe({
      next: (d) => { this.tours = d; this.loading = false; },
      error: () => { this.tours = this.data.tours; this.loading = false; }
    });
  }

  openNew(): void { this.form = { name: '', category: 'Cultural', price: '', duration: '', difficulty: 'Easy', shortDesc: '', description: '', coverImage: '', includes: '', excludes: '' }; this.editing = null; this.showForm = true; }
  openEdit(t: any): void { this.form = { ...t, includes: Array.isArray(t.includes) ? t.includes.join('\n') : t.includes || '', excludes: Array.isArray(t.excludes) ? t.excludes.join('\n') : t.excludes || '' }; this.editing = t; this.showForm = true; }
  closeForm(): void { this.showForm = false; this.editing = null; }

  save(): void {
    this.saving = true;
    const payload = { ...this.form, price: Number(this.form.price), duration: Number(this.form.duration), includes: this.form.includes?.split('\n').map((s: string) => s.trim()).filter(Boolean), excludes: this.form.excludes?.split('\n').map((s: string) => s.trim()).filter(Boolean) };
    const obs = this.editing ? this.api.updateTour(this.editing._id || this.editing.id, payload) : this.api.createTour(payload);
    obs.subscribe({
      next: () => { this.successMsg = this.editing ? 'Tour updated!' : 'Tour created!'; this.closeForm(); this.load(); this.saving = false; setTimeout(() => this.successMsg = '', 3000); },
      error: (e) => { alert(e.error?.message || 'Error: backend required.'); this.saving = false; }
    });
  }

  confirmDelete(id: string): void { this.deleteConfirm = id; }
  cancelDelete(): void { this.deleteConfirm = null; }
  doDelete(): void {
    if (!this.deleteConfirm) return;
    this.api.deleteTour(this.deleteConfirm).subscribe({
      next: () => { this.successMsg = 'Tour deleted!'; this.load(); this.deleteConfirm = null; setTimeout(() => this.successMsg = '', 3000); },
      error: () => { this.deleteConfirm = null; }
    });
  }
}
