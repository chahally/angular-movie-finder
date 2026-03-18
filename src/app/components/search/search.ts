// SearchComponent

// Provides a search input box and search button to query movies.
// Emits search queries to the parent component using an Event Emitter.
// The parent component (Home Component) listens to the 'search' event and fetches results.
// Query is trimmed and validated before emitting.

import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent {
  query = '';
  @Output() search = new EventEmitter<string>();

onSearch() {
  const cleanQuery = this.query.trim();
  if (cleanQuery) {
    this.search.emit(cleanQuery.toLowerCase());
  }
}
}