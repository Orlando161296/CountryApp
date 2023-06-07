import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {

  public countries: Country[] = [];

  //TODO: Cada vez que necesitemos usar un servicio recordar la inyeccion del mismo
  constructor(private countriesService: CountriesService){}

  SearchByCountry( term: string ): void {
    this.countriesService.searchCountries( term )
      .subscribe( countries => {
        this.countries = countries;
      });
    }
}
