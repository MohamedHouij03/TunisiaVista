import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/services/data.service';
@Component({ selector:'app-blog', standalone:true, imports:[CommonModule,RouterLink,FormsModule], templateUrl:'./blog.component.html' })
export class BlogComponent implements OnInit {
  all: any[] = [];
  filtered: any[] = [];
  activeCategory = 'All';
  categories = ['All','Beaches','Desert','Culture','Food','History','Tips'];
  constructor(private data: DataService) {}
  ngOnInit(): void { this.all = this.data.blogPosts; this.filtered = this.all; }
  filter(c: string): void { this.activeCategory = c; this.filtered = c === 'All' ? this.all : this.all.filter(b => b.category === c); }
}
