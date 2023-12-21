import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

import { CommentsComponent } from '../comments/comments.component';
import { ApiService } from '../../services/api/api.service';

import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [CommonModule, CommentsComponent, MatToolbarModule, MatListModule],
  templateUrl: './story.component.html',
  styleUrl: './story.component.css'
})

export class StoryComponent {
  storyId:  string | null = null;
  storyCommentIds: number[] = [];
  comments: Comment[] = [];
  storyText: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {

    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam !== null) {
      this.storyId = idParam;
    } else {
      this.router.navigate(['/404']);
    }
  }

  ngOnInit(): void {
    this.getStory(this.storyId);
    this.getCommentOfStory(this.storyCommentIds);
  }

  getStory(id: String | null = null){
    try {
      this.apiService.getStoryByID(id).subscribe(data => {
        if(!data){
          this.router.navigate(['/404']);
          return
        }

        else if(data.type!=="story"){
          this.router.navigate(['/404']);
          return
        }
        else{
          this.storyCommentIds = data.kids;
          this.storyText = data.title;
        }
        
      });
    } catch (error) {
      this.router.navigate(['/404']);
      return
    }
    
  }

  getCommentOfStory(kids: number[]){
    this.apiService.getCommentsByIDs(kids).subscribe(data => {
      data.forEach(item => {
        if (item.deleted !== true) {
          this.comments.push(item);
        }
      });
    })
  }
}
