// Movie Card Component
// Displays an individual movie in a card format, including poster, title, rating, and release date.
// Uses @Input() to receive a movie object from parent component (Home Component).
// Provides a 'posterUrl' that returns the full TMDB poster URL or a placeholder if missing.

import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.css']
})
export class MovieCardComponent {
  @Input() movie?: Movie;

  get posterUrl() {
    return this.movie?.poster_path
      ? 'https://image.tmdb.org/t/p/w500' + this.movie.poster_path
      : 'https://via.placeholder.com/500x750?text=No+Image';
  }
}