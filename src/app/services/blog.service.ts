import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Blog } from '../model/Blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl = 'https://localhost:7156/api';

  constructor(private http: HttpClient) {}

  getAllBlogs(): Observable<any[]> {
    // Correct the endpoint URL to match the server's API
    return this.http.get<any[]>(`${this.baseUrl}/Blog`);
  }

  createBlog(blog: Blog): Observable<any> {
    console.log('Sending createBlog request:', blog);
    return this.http.post(`${this.baseUrl}/Blog`, blog).pipe(
      tap((response: any) => console.log('createBlog response:', response))
    );
  }
}
