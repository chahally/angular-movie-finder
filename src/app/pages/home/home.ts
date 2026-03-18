// Home Component

// Main page component displaying movie search results.
// Handles:
// - movies: array of movie objects
// - loading: boolean for API call in progress
// - error: string for API errors

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card';
import { SearchComponent } from '../../components/search/search';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, SearchComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class HomeComponent {
  movies: Movie[] = [];
  loading = false;
  error: string | null = null;

  constructor(private movieService: MovieService) {}

  onSearch(query: string) {
    this.loading = true;
    this.error = null;

    if (!query) {
      this.movies = [];
      this.loading = false;
      return;
    }

    this.movieService.searchMovies(query).subscribe({
      next: movies => {
        this.movies = movies;
        this.loading = false;
      },
      error: err => {
        console.error("API error:", err);
        this.error = err?.status === 429
          ? 'Too many requests. Please try again later.'
          : 'Failed to fetch movies.';
        this.loading = false;
      }
    });
  }
}