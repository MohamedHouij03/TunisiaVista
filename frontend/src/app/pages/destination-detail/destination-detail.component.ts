import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-destination-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './destination-detail.component.html'
})
export class DestinationDetailComponent implements OnInit {
  destination: any = null;
  relatedTours: any[] = [];
  notFound = false;

  galleryImages = [
    'assets/images/carthage.jpg',
    'assets/images/Sidi%20Bou%20Said.jpg',
    'assets/images/kairouan.jpg',
    'assets/images/hammamet.jpeg',
    'assets/images/eljem.jpg',
    'assets/images/tunis.jpg',
  ];

  constructor(private route: ActivatedRoute, private data: DataService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.destination = this.data.destinations.find(d => d.id === id || d.name.toLowerCase() === id?.toLowerCase());
    if (!this.destination) { this.notFound = true; return; }
    this.relatedTours = this.data.tours.slice(0, 3);
    window.scrollTo(0, 0);
  }
}
