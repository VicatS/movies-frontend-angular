import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.interface';
import { ClassificationService } from 'src/app/services/classification.service';
import { GenreService } from 'src/app/services/genre.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
})
export class MovieFormComponent implements OnInit {
  @Input() movie: Movie | null = null;
  movieForm: FormGroup;
  selectedFile: File | null = null;
  imagePreviewUrl: string | ArrayBuffer | null = null;

  genres: string[] = [];
  classifications: string[] = []

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private genreService: GenreService,
    private router: Router,
    private route: ActivatedRoute,
    private classificationService: ClassificationService
  ) {
    this.movieForm = this.fb.group({
      name: ['', Validators.required],
      cover_image: [''],
      classification: ['', Validators.required],
      genre: ['', Validators.required],
      release_date: ['', Validators.required],
      synopsis: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.movieService.getMovie(+id).subscribe((movie: Movie) => {
          this.movie = movie;
          this.movieForm.patchValue(movie);
          this.imagePreviewUrl = this.movieService.getImageUrl(
            movie.cover_image
          );
        });
      }
    });
    this.genres = this.genreService.getGenres();
    this.classifications = this.classificationService.getClassifications();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imagePreviewUrl = null;
    this.movieForm.get('cover_image')?.reset();
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      const formData = new FormData();
      formData.append('name', this.movieForm.get('name')?.value);
      formData.append(
        'classification',
        this.movieForm.get('classification')?.value
      );
      formData.append('genre', this.movieForm.get('genre')?.value);
      formData.append(
        'release_date',
        this.movieForm.get('release_date')?.value
      );
      formData.append('synopsis', this.movieForm.get('synopsis')?.value);

      if (this.selectedFile) {
        formData.append('cover_image', this.selectedFile);
      }

      if (this.movie) {
        this.movieService
          .updateMovie(formData, this.movie.id!)
          .subscribe(() => {
            this.router.navigate(['/manage']);
          });
      } else {
        this.movieService.addMovie(formData).subscribe(() => {
          this.router.navigate(['/manage']);
        });
      }
    }
  }
}
