import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { Observable, of, catchError, map,delay, tap }from 'rxjs';
import { CacheStore } from '../interfaces/cach-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1/'

  public cachStore: CacheStore ={
    byCapital: { term: '' , countries: [] },
    byCountries: { term: '' , countries: [] },
    byRegion: { region: '' , countries: [] },
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStorage', JSON.stringify( this.cachStore ))
  }

  private loadFromLocalStorage(){
    if( !localStorage.getItem('cacheStorage') ) return;
    this.cachStore = JSON.parse( localStorage.getItem('cacheStorage')! );
  }

  private getCountriesRequest( url: string): Observable<Country[]>{
    return this.http.get<Country[]>( url )
    .pipe(
      catchError( () =>  of([])),
      // delay( 2000 ),
     );
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null>{

   const url = `${this.apiUrl}/alpha/${ code }`;

   return  this.http.get<Country[]>( url )
   .pipe(
    map( countries => countries.length > 0? countries[0] : null),
    catchError( () =>  of( null))
   );
  }


  searchCapital( term: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${ term }`;
    return  this.getCountriesRequest( url )
      .pipe(
        tap( countries => this.cachStore.byCapital = { term, countries} ),
        tap( ()=> this.saveToLocalStorage()),
      );
  }

  searchCountries( term: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${ term }`;
    return  this.getCountriesRequest( url )
    .pipe(
      tap( countries => this.cachStore.byCountries = { term, countries} ),
      tap( ()=> this.saveToLocalStorage()),
    );
  }

  searchRegion( region: Region ): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${ region }`;
    return  this.getCountriesRequest( url )
    .pipe(
      tap( countries => this.cachStore.byRegion = { region, countries} ),
      tap( ()=> this.saveToLocalStorage()),
    );
  }
}
