import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  private baseUrl = 'https://api.weather.gov/gridpoints';

  constructor(private http: HttpClient) { }

  getForecast(location: string): Observable<any> {
    let url: string;
    if (location === 'LWX') {
      url = 'https://api.weather.gov/gridpoints/LWX/31,80/forecast';
    } else if (location === 'TOP') {
      url = 'https://api.weather.gov/gridpoints/TOP/31,80/forecast';
    } else {
      throw new Error('Invalid location');
    }
    return this.http.get(url);
  }
}
