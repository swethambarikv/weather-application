import { HttpClient } from '@angular/common/http'
import { LitElement, html, css } from 'lit-element'
import { property } from 'lit/decorators.js'
import { customElement } from 'lit/decorators.js';

import { WeatherService } from '../service/weather.service'

@customElement('weather-display')
export class WeatherDisplay extends LitElement {
  static override styles = css`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .search {
      margin-bottom: 20px;
    }

    input[type='text'] {
      padding: 10px;
      width: 200px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
    }

    .weather-container {
      border: 2px solid #ccc;
      border-radius: 10px;
      padding: 20px;
      width: 300px;
    }

    .upper-data {
      text-align: center;
    }

    .upper-data img {
      width: 100px;
      height: 100px;
      margin: 0 10px;
    }

    .hr {
      margin: 20px 0;
    }

    .weather-data {
      text-align: center;
    }

    .location {
      font-size: 24px;
      font-weight: bold;
    }

    .temperature {
      font-size: 48px;
      font-weight: bold;
      color: #007bff;
    }
  `
  @property({ type: String }) cityName = ''
  @property({ type: String }) errorMessage = ''
  temperatureResult: any
  constructor(private httpClient: HttpClient) {
    super()
  }

  async onSubmit(event: any) {
    event.preventDefault()
    try {
      const weatherService = new WeatherService(this.httpClient)
      const weatherData = weatherService.getWeatherData(this.cityName)
      this.temperatureResult = weatherData
    } catch (error) {
      this.errorMessage = 'An error occurred while fetching weather data.'
    }
  }

  handleCityChange(event: any) {
    this.cityName = event.target.value
  }

  override render() {
    return html`
      <div class="container">
        <div class="weather-container">
          <div class="search">
            <form @submit=${this.onSubmit}>
              <input
                type="text"
                placeholder="Search City"
                .value=${this.cityName}
                @change=${this.handleCityChange}
              />
            </form>
            ${this.errorMessage
              ? html`<p class="error-message">${this.errorMessage}</p>`
              : ''}
            <div class="upper-data">
              <img
                src="../assets/mountains.webp"
                alt="Mountains Image"
                ?hidden=${this.temperatureResult?.main?.temp_max < 14}
              />
              <img
                src="../assets/cold.jpg"
                alt="Cold Image"
                ?hidden=${this.temperatureResult?.main?.temp_max >= 14}
              />
            </div>
            <hr />
            <div class="weather-data" ?hidden=${!this.temperatureResult}>
              <div class="location">${this.temperatureResult?.name || ''}</div>
              <div
                class="temperature"
                ?hidden=${this.temperatureResult?.main?.temp_max < 14}
              >
                ${this.temperatureResult?.main?.temp_max}°C
              </div>
              <div
                class="temperature"
                ?hidden=${this.temperatureResult?.main?.temp_max >= 14}
              >
                - ${this.temperatureResult?.main?.temp_max}°C
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
}
