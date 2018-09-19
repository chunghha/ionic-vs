import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { CountryDataService } from '../providers/country-data.service';
import { Country } from '../models/country';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnDestroy, OnInit {
  countries: Country[] = [];
  responseData: Country[] = [];
  searchTerm = '';
  searchControl: FormControl;
  items: any;
  searching = false;

  constructor(private countryData: CountryDataService) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.countryData.getAll()
      .pipe(untilDestroyed(this))
      .subscribe((countries: any) => {
        this.responseData = countries;
        this.countries = countries;
      });
  }

  ngOnDestroy() { }

  filterCountries(ev) {

    const searchTerm = ev.target.value;

    if (searchTerm && searchTerm.trim() !== '') {
      this.countries = this.responseData.filter((country: Country) => {
        return (country.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      });
    } else {
      this.countries = this.responseData;
    }
  }

}
