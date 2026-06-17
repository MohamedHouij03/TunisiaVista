import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './destinations.component.html'
})
export class DestinationsComponent implements OnInit {
  all: any[] = [];
  filtered: any[] = [];
  activeRegion = 'All';
  searchQuery = '';
  regions = ['All', 'North', 'Sahel', 'Cap Bon', 'South', 'Island'];

  constructor(private data: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.all = this.data.destinations;
    this.route.queryParams.subscribe(p => {
      if (p['region']) { this.activeRegion = p['region']; }
      this.filter();
    });
  }

  filter(): void {
    this.filtered = this.all.filter(d => {
      const matchRegion = this.activeRegion === 'All' || d.region === this.activeRegion;
      const matchSearch = !this.searchQuery || d.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || d.shortDesc.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchRegion && matchSearch;
    });
  }

  setRegion(r: string): void { this.activeRegion = r; this.filter(); }
}
