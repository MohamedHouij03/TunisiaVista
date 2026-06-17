import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({ selector:'app-gallery', standalone:true, imports:[CommonModule,RouterLink], templateUrl:'./gallery.component.html' })
export class GalleryComponent implements OnInit {
  activeCategory = 'All';
  categories = ['All','Beaches','Desert','Culture','Cities','Food','Historical'];
  allImages: any[] = [];
  filtered: any[] = [];
  ngOnInit(): void {
    this.allImages = [
      { src:'assets/images/hammamet.jpeg', cat:'Beaches', title:'Mediterranean Shore', span: 'col-span-2' },
      { src:'assets/images/kairouan.jpg', cat:'Desert', title:'Saharan Dunes', span: '' },
      { src:'assets/images/Sidi%20Bou%20Said.jpg', cat:'Culture', title:'Sidi Bou Said', span: '' },
      { src:'assets/images/carthage.jpg', cat:'Historical', title:'Carthage Ruins', span: '' },
      { src:'assets/images/kairouan.jpg', cat:'Desert', title:'Golden Dunes', span: '' },
      { src:'assets/images/tunis.jpg', cat:'Food', title:'Tunisian Cuisine', span: '' },
      { src:'assets/images/tunis.jpg', cat:'Cities', title:'Tunis Medina', span: 'col-span-2' },
      { src:'assets/images/hammamet.jpeg', cat:'Beaches', title:'Djerba Beach', span: '' },
      { src:'assets/images/kairouan.jpg', cat:'Desert', title:'Night Sky', span: '' },
      { src:'assets/images/eljem.jpg', cat:'Historical', title:'El Djem Amphitheatre', span: '' },
      { src:'assets/images/hammamet.jpeg', cat:'Beaches', title:'Hammamet Bay', span: '' },
      { src:'assets/images/Sousse.jpg', cat:'Culture', title:'Sousse Medina', span: '' },
    ];
    this.filtered = this.allImages;
  }
  filter(c: string): void { this.activeCategory = c; this.filtered = c === 'All' ? this.allImages : this.allImages.filter(i => i.cat === c); }
}
