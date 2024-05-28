import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private genres: string[] = [
    'Action',
    'Comedy',
    'Drama',
    'Terror',
    'Science Fiction',
    'Adventure',
    'Musical',
  ];

  constructor() {}

  getGenres(): string[] {
    return this.genres;
  }
}
