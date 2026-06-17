import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-admin-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './admin-blog.component.html'
})
export class AdminBlogComponent implements OnInit {
  posts: any[] = [];
  loading = false;
  showForm = false;
  editing: any = null;
  saving = false;
  deleteConfirm: string | null = null;
  successMsg = '';
  filterStatus = 'all';

  form: any = { title: '', category: 'Culture', excerpt: '', content: '', coverImage: '', authorName: '', readTime: 5, isPublished: false, featured: false };
  categories = ['Culture', 'Beaches', 'Desert', 'Food', 'History', 'Tips', 'Travel'];

  get filtered() {
    if (this.filterStatus === 'all') return this.posts;
    if (this.filterStatus === 'published') return this.posts.filter(p => p.isPublished);
    return this.posts.filter(p => !p.isPublished);
  }

  constructor(private api: ApiService, private data: DataService) {}
  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.api.getBlogPosts({ approved: false }).subscribe({
      next: (r: any) => { this.posts = Array.isArray(r) ? r : r.data || []; this.loading = false; },
      error: () => { this.posts = this.data.blogPosts; this.loading = false; }
    });
  }

  openNew(): void { this.form = { title: '', category: 'Culture', excerpt: '', content: '', coverImage: '', authorName: '', readTime: 5, isPublished: false, featured: false }; this.editing = null; this.showForm = true; }
  openEdit(p: any): void { this.form = { ...p }; this.editing = p; this.showForm = true; }
  closeForm(): void { this.showForm = false; this.editing = null; }

  save(): void {
    this.saving = true;
    const obs = this.editing ? this.api.updateBlogPost(this.editing._id || this.editing.id, this.form) : this.api.createBlogPost(this.form);
    obs.subscribe({
      next: () => { this.successMsg = this.editing ? 'Post updated!' : 'Post created!'; this.closeForm(); this.load(); this.saving = false; setTimeout(() => this.successMsg = '', 3000); },
      error: (e: any) => { alert(e.error?.message || 'Error: backend required.'); this.saving = false; }
    });
  }

  confirmDelete(id: string): void { this.deleteConfirm = id; }
  cancelDelete(): void { this.deleteConfirm = null; }
  doDelete(): void {
    if (!this.deleteConfirm) return;
    this.api.deleteBlogPost(this.deleteConfirm).subscribe({
      next: () => { this.successMsg = 'Post deleted!'; this.load(); this.deleteConfirm = null; setTimeout(() => this.successMsg = '', 3000); },
      error: () => { this.deleteConfirm = null; }
    });
  }
}
