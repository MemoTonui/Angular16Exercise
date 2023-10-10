import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Countries } from './table-data';
import { TableDataService } from './table-data.service';
import { FormControl } from '@angular/forms';
import { debounceTime, of, switchMap } from 'rxjs';
import { ReactiveDataService } from './reactive-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css'],
})
export class TableDataComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private countriesService: TableDataService,
    private searchService: ReactiveDataService
  ) {}
  // countriesList$ = this.countriesService.getCountries();
  public input = new FormControl('');
  public countriesList$!: Observable<Countries[]>;
  ngOnInit(): void {
    if (this.input.valueChanges) {
      this.getSearch();
    } else {
      this.countriesService.getCountries();
    }
  }

  getSearch() {
    this.countriesList$ = this.input.valueChanges.pipe(
      debounceTime(700),
      switchMap((text) => {
        if (text) {
          console.log('INPUT' + this.input.value);
          return this.searchService.getSearchCountries(this.input.value);
        }
        return this.countriesService.getCountries();
      })
    );
  }

  getCountriesList() {
    this.countriesList$ = this.countriesService.getCountries();
    return this.countriesList$;
  }
}
