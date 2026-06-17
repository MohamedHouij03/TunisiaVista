import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({ selector:'app-about-agency', standalone:true, imports:[CommonModule,RouterLink], templateUrl:'./about-agency.component.html' })
export class AboutAgencyComponent {
  team = [
    { name:'Khaled Ben Youssef', role:'CEO & Founder', avatar:'K', bio:'25 years crafting extraordinary Tunisia experiences.' },
    { name:'Amira Mansouri', role:'Head of Operations', avatar:'A', bio:'Logistics expert ensuring flawless tours.' },
    { name:'Omar Trabelsi', role:'Lead Desert Guide', avatar:'O', bio:'Expert Saharan guide with encyclopedic knowledge.' },
    { name:'Nadia Hamdi', role:'Heritage Expert', avatar:'N', bio:'Archaeologist specializing in Carthaginian and Roman sites.' },
  ];
}
