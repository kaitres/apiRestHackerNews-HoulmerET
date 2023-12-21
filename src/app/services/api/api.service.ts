import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Story } from '../../models/story.model';
import { Comment } from '../../models/comment.model';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private urlApi = 'https://hacker-news.firebaseio.com/v0';
  private urlGetTopStories = this.urlApi+'/topstories.json';
  private urlGetaItem = this.urlApi+'/item/';

  constructor(private http: HttpClient) { }

  public getTopIDs(): Observable<Number[]> {
    return this.http.get<Number[]>(this.urlGetTopStories);
  }

  public getStoriesByIDs(ids: Number[]): Observable<Story[]> {
    return forkJoin(ids.map((id) => this.http.get<Story>(this.urlGetaItem+`${id}`+'.json')));
  }

  public getStoryByID(id: any): Observable<Story> {
    return this.http.get<Story>(this.urlGetaItem+`${id}`+'.json');
  }

  public getCommentsByIDs(ids: Number[]): Observable<Comment[]> {
    return forkJoin(ids.map((id) => this.http.get<Comment>(this.urlGetaItem+`${id}`+'.json')));
  }
}
