import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryDataService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get('https://restcountries.eu/rest/v2/all');
  }
  
}
