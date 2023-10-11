import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
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
    const url = `${this.url}region/${region}`;
    return this.http
      .get<Countries[]>(url)
      .pipe(retry(1), catchError(this.handleError));
  }
  handleError(error: any) {
    let errorMessage: any;
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage =
        "Sorry! The Region you have entered doesn't exist. Please enter another";
    }

    alert(
      "Sorry! The Region you have entered doesn't exist. Please enter another"
    );
    window.location.reload();
    return throwError(errorMessage);
  }
}
