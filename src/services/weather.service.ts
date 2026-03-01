import { ApiClient } from '../core/api-client.js';
import { ConfigLoader } from '../core/config-loader.js';
import { NexusError } from '../core/errors.js';

export interface WeatherData {
  name: string;
  main: { temp: number; humidity: number };
  weather: Array<{ description: string }>;
}

/**
 * Weather Service: Climate telemetry integration.
 */
export class WeatherService {
  private client: ApiClient;

  constructor() {
    this.client = new ApiClient('https://api.openweathermap.org/data/2.5');
  }

  async getCurrentWeather(city: string): Promise<WeatherData> {
    const key = ConfigLoader.get().OPENWEATHER_API_KEY;
    if (!key) {
      throw new NexusError('Climate metrics require an OPENWEATHER_API_KEY in .env');
    }
    return this.client.get<WeatherData>('/weather', {
      params: { q: city, appid: key, units: 'metric' },
    });
  }
}
