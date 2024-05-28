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
    'Animation'
  ];

  constructor() {}

  getGenres(): string[] {
    return this.genres;
  }
}
