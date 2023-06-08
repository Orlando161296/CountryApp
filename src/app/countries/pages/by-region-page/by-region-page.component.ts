import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit{
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;


  //TODO: Cada vez que necesitemos usar un servicio recordar la inyeccion del mismo
  constructor(private countriesService: CountriesService){}
  ngOnInit(): void {
    this.countries = this.countriesService.cachStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cachStore.byRegion.region;
  }

  SearchByRegion( region: Region ): void {

    this.selectedRegion = region;

    this.countriesService.searchRegion( region )
      .subscribe( countries => {
        this.countries = countries;
      });
    }
}
