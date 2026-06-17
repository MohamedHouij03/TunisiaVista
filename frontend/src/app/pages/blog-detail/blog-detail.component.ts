import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DataService } from '../../core/services/data.service';
@Component({ selector:'app-blog-detail', standalone:true, imports:[CommonModule,RouterLink], templateUrl:'./blog-detail.component.html' })
export class BlogDetailComponent implements OnInit {
  post: any = null; related: any[] = []; notFound = false;
  constructor(private route: ActivatedRoute, private data: DataService) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.post = this.data.blogPosts.find(b => b.slug === id);
    if (!this.post) { this.notFound = true; return; }
    this.related = this.data.blogPosts.filter(b => b.slug !== id).slice(0,3);
    window.scrollTo(0,0);
  }
}
