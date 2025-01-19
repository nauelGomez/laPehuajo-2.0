import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  private searchResultsSubject = new BehaviorSubject<any[]>([]);
  searchResults$ = this.searchResultsSubject.asObservable();

  setSearchTerm(term: string): void {
    this.searchTermSubject.next(term);

    if (term.trim().length > 0) {
      this.search(term);
    } else {
      this.searchResultsSubject.next([]); // Limpia los resultados si no hay término
    }
  }

  async search(term: string): Promise<void> {
    try {
      const response = await axios.get(`https://api.example.com/products?search=${term}`);
      this.searchResultsSubject.next(response.data);
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
      this.searchResultsSubject.next([]); // Limpia resultados en caso de error
    }
  }
}
