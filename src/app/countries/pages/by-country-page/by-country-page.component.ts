import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit{

  public countries: Country[] = [];
  public initialValue: string = '';

  //TODO: Cada vez que necesitemos usar un servicio recordar la inyeccion del mismo
  constructor(private countriesService: CountriesService){}
  ngOnInit(): void {
    this.countries = this.countriesService.cachStore.byCountries.countries
    this.initialValue = this.countriesService.cachStore.byCountries.term
  }

  SearchByCountry( term: string ): void {
    this.countriesService.searchCountries( term )
      .subscribe( countries => {
        this.countries = countries;
      });
    }
}
