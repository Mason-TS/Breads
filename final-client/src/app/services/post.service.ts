import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseURL: string = "http://localhost:5190/api/social";
  tokenKey: string = "myPostToken";

  constructor(private http: HttpClient) { }

  getAllPosts() { 
    return this.http.get<Post[]>(this.baseURL);
  }

  getPost(postId: string) {
    return this.http.get<Post>(this.baseURL + "/" + postId);
  }

  createPost(newPost: Post) {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }
    return this.http.post(this.baseURL, newPost, { headers: reqHeaders });
  }

  updatePost(updatedPost: Post) {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }
    return this.http.put(this.baseURL + "/" + updatedPost.postId, updatedPost, { headers: reqHeaders });
  }

  deletePost(postId: string) {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }
    console.log(this.baseURL + "/" + postId);
    return this.http.delete(this.baseURL + "/" + postId, { headers: reqHeaders });

  }

  getPostsByUsername(username:string):Observable<Post[]> {
    var url = `${this.baseURL}?username=${username}`;
    console.log(url);
    
    return this.http.get<Post[]>(url);
  }

}
