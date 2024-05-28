import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.interface';
import { AlertService } from 'src/app/services/alert.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-management',
  templateUrl: './movie-management.component.html',
  styleUrls: ['./movie-management.component.css'],
})
export class MovieManagementComponent implements OnInit {
  movies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data: Movie[]) => {
      this.movies = data;
    });
  }

  editMovie(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  deleteMovie(id: number): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(id).subscribe({
        next: () => {
          this.movies = this.movies.filter((movie) => movie.id !== id);
          this.alertService.success('Movie deleted successfully');
        },
        error: (error) => {
          this.alertService.error('Failed to delete movie');
        },
        complete: () => {
          console.log('Movie deletion process completed.');
        },
      });
    }
  }
}
