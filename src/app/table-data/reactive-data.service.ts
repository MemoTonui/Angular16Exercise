import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Countries } from './table-data';
import { Injectable } from '@angular/core';
import { TableDataService } from './table-data.service';

@Injectable({
  providedIn: 'root',
})
export class ReactiveDataService {
  private url: string = 'https://restcountries.com/v3.1/';
  constructor(private http: HttpClient, private tableData: TableDataService) {}

  getSearchCountries(region: any): Observable<Countries[]> {
    const url = `${this.url}/region/${region}`;
    return this.http.get<Countries[]>(url);
  }
}
