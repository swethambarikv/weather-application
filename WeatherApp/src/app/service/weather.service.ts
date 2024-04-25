import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'environment'
import { Observable } from 'rxjs'

import { WeatherData } from '../models/weather.model'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'assets/db.json'

  public getWeatherData(cityName: string): Observable<any> {
    // return this.http.get(this.apiUrl)
    return this.http.get<WeatherData>(environment.weatherAPIBaseURL, {
      headers: new HttpHeaders()
        .set(environment.XRapidAPIHeaderName, environment.XRapidAPIHeaderValue)
        .set(
          environment.XRapidAPIKeyHeaderName,
          environment.XRapidAPIKeyHeaderValue
        ),
      params: new HttpParams()
        .set('q', cityName)
        .set('units', 'metric')
        .set('mode', 'json')
    })
  }
}
