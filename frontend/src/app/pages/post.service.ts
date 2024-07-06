import { Injectable } from '@angular/core';
import { Post } from '../interface/post';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient) {}

  getPosts(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/api/posts');
  }

  addPost(post: Post): Observable<any> {
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);
    console.log('Add', post);
    if (post.imagePath) postData.append('image', post.imagePath);

    return this.httpClient.post('http://localhost:3000/api/posts', postData);
  }

  editPost(id: string): Observable<any> {
    return this.httpClient.put(`http://localhost:3000/api/posts/${id}`, {});
  }

  deletePost(id: string): Observable<any> {
    return this.httpClient.delete(`http://localhost:3000/api/posts/${id}`);
  }
}
