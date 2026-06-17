import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './tours.component.html'
})
export class ToursComponent implements OnInit {
  all: any[] = [];
  filtered: any[] = [];
  activeCategory = 'All';
  categories = ['All', 'Cultural', 'Adventure', 'Beach', 'Desert', 'City', 'Luxury'];
  sortBy = 'featured';

  constructor(private data: DataService) {}
  ngOnInit(): void { this.all = this.data.tours; this.filter(); }
  filter(): void {
    this.filtered = this.all
      .filter(t => this.activeCategory === 'All' || t.category === this.activeCategory)
      .sort((a, b) => {
        if (this.sortBy === 'price-asc') return a.price - b.price;
        if (this.sortBy === 'price-desc') return b.price - a.price;
        if (this.sortBy === 'duration') return a.duration - b.duration;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }
  setCategory(c: string): void { this.activeCategory = c; this.filter(); }
}
