import { Component} from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common'

import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Story } from '../../models/story.model';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatPaginatorModule, MatListModule, MatToolbarModule],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css'
})

export class TopComponent {
  data: Number[] = [];
  stories: Story[] = [];

  pageEvent: PageEvent;
  pageIndex = 0;

  loading: Boolean = false;

  constructor(private apiService: ApiService, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.fillOutData();
  }

  fillOutData() {
    this.apiService.getTopIDs().subscribe(data => {
      this.data = data;
      this.fillOutStories();
    });
  }

  fillOutStories(){
    let i = this.pageIndex;
    let ids = this.data.slice(50*i, 50*i+50);

    this.apiService.getStoriesByIDs(ids).subscribe(stories => {
      try {
        this.stories = stories;
        this.loading = false;
        this.viewportScroller.scrollToPosition([0,0]);
      } catch (error) {
        this.loading = false;
        this.viewportScroller.scrollToPosition([0,0]);
        return
      }
      
    });
    
  }

  handlePageEvent(e: PageEvent) {
    this.loading = true;
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.fillOutStories();
    
  }
  
}
