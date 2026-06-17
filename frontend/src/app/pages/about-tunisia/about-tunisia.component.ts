import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({ selector:'app-about-tunisia', standalone:true, imports:[CommonModule,RouterLink], templateUrl:'./about-tunisia.component.html' })
export class AboutTunisiaComponent {
  unescoSites = [
    { name:'Medina of Tunis', year:'1979', icon:'bi bi-building' },
    { name:'Site of Carthage', year:'1979', icon:'bi bi-bank' },
    { name:'Medina of Sousse', year:'1988', icon:'bi bi-geo-alt' },
    { name:'Medina of Sfax', year:'1988', icon:'bi bi-pin-map' },
    { name:'Kairouan', year:'1988', icon:'bi bi-moon-stars' },
    { name:'Amphitheatre of El Djem', year:'1979', icon:'bi bi-columns-gap' },
    { name:'Ichkeul National Park', year:'1980', icon:'bi bi-tree' },
    { name:'Punic Town of Kerkouane', year:'1985', icon:'bi bi-columns' },
  ];
  climateZones = [
    { name:'Mediterranean North', desc:'Mild winters, warm dry summers. Tunis, Bizerte, Cap Bon.', icon:'bi bi-sun', color:'var(--clr-primary)' },
    { name:'Semi-Arid Centre', desc:'Hot summers, cool winters. Kairouan, El Djem, Kasserine.', icon:'bi bi-thermometer-half', color:'var(--clr-secondary)' },
    { name:'Saharan South', desc:'Extreme heat in summer, cool winters. Perfect Oct–Mar.', icon:'bi bi-brightness-high', color:'#B8860B' },
    { name:'Coastal Sahel', desc:'Warm year-round. Best for beach holidays May–Oct.', icon:'bi bi-water', color:'var(--clr-primary-lt)' },
  ];
}
