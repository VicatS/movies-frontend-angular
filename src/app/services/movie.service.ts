import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://127.0.0.1:5000/api/v1/movies';
  private imageBaseUrl = 'http://127.0.0.1:5000/static/uploads';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  addMovie(formData: FormData): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, formData);
  }

  updateMovie(formData: FormData, id: number): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/${id}`, formData);
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getImageUrl(filename: string): string {
    return `${this.imageBaseUrl}/${filename}`;
  }
}
