import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';

import { ApiService } from '../../services/api/api.service';

import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})

export class CommentsComponent {
  @Input() commentId!: Comment;
  comments: Comment[] = [];

  constructor (private apiService: ApiService){
    
  }

  ngOnInit(): void {
    this.getCommentOfComment(this.commentId.kids)
  }

  getCommentOfComment(kids: Number[] | undefined){
    if (!kids || kids.length === 0) return;
    this.apiService.getCommentsByIDs(kids).subscribe(data => {
      data.forEach(item => {
        if (item.deleted !== true) {
          this.comments.push(item);
        }
      });
    })
  }
}
