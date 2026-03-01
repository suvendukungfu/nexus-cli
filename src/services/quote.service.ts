import { ApiClient } from '../core/api-client.js';

export interface Quote {
  content: string;
  author: string;
}

/**
 * Quote Service: Philosophy and wisdom aggregation.
 */
export class QuoteService {
  private client: ApiClient;

  constructor() {
    this.client = new ApiClient('https://api.quotable.io');
  }

  async getRandom(): Promise<Quote> {
    return this.client.get<Quote>('/random');
  }
}
