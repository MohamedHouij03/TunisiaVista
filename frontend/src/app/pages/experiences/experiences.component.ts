import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/services/data.service';
@Component({ selector:'app-experiences', standalone:true, imports:[CommonModule,RouterLink], templateUrl:'./experiences.component.html' })
export class ExperiencesComponent { experiences: any[] = [];
  constructor(public data: DataService) { this.experiences = this.data.experiences; }
}
