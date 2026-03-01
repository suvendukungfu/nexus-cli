import { ApiClient } from '../core/api-client.js';

export interface Joke {
  setup: string;
  punchline: string;
}

/**
 * Joke Service: Casual humor telemetry integration.
 */
export class JokeService {
  private client: ApiClient;

  constructor() {
    this.client = new ApiClient('https://official-joke-api.appspot.com');
  }

  async getRandom(): Promise<Joke> {
    return this.client.get<Joke>('/random_joke');
  }
}
