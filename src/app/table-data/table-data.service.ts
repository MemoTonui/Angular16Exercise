import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Countries } from './table-data';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableDataService {
  private url: string = 'https://restcountries.com/v3.1/all';
  constructor(private http: HttpClient) {}

  getCountries(page: number): Observable<Countries[]> {
    this.http.get<Countries[]>(this.url + '?page=' + page).subscribe((data) => {
      console.log(data);
    });
    console.log();

    return this.http.get<Countries[]>(this.url + '?page=' + page);
  }
}
