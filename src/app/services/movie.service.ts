// MovieService

// Service for fetching movies from the TMDB API.
// Methods:
// - searchMovies(query): returns an Observable<Movie[]> from TMDB search endpoint
// Uses HttpClient to perform GET request and map API response to Movie array.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Movie } from '../models/movie.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3/search/movie';

  private cache = new Map<string, Observable<Movie[]>>();

  constructor(private http: HttpClient) {}

  searchMovies(query: string): Observable<Movie[]> {
    if (!query) return of([]);

    if (this.cache.has(query)) return this.cache.get(query)!;

    const request$ = this.http.get<any>(
      `${this.apiUrl}?api_key=${environment.apiKey}&query=${query}`
    ).pipe(
      map(response => response.results),
      shareReplay(1)
    );

    this.cache.set(query, request$);
    return request$;
  }
}