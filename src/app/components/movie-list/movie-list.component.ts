import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.interface';
import { GenreService } from 'src/app/services/genre.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  allMovies: Movie[] = [];
  selectedGenre: string = 'All';
  selectedMovie: Movie | null = null;

  genres: string[] = [];

  constructor(
    private movieService: MovieService,
    private genreService: GenreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.genres = this.genreService.getGenres();
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe((movies) => {
      this.allMovies = movies;
      this.filterMovies();
    });
  }

  filterByGenre(genre: string): void {
    this.selectedGenre = genre;
    this.filterMovies();
  }

  filterMovies(): void {
    if (this.selectedGenre === 'All') {
      this.movies = this.allMovies;
    } else {
      this.movies = this.allMovies.filter(
        (movie) => movie.genre === this.selectedGenre
      );
    }
  }

  selectMovie(movie: Movie): void {
    this.selectedMovie = movie;
  }

  goToDetail(id: number): void {
    this.router.navigate(['/detail', id]);
  }

  getImageUrl(filename: string): string {
    return this.movieService.getImageUrl(filename);
  }
}
