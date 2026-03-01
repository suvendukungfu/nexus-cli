import { ApiClient } from '../core/api-client.js';
import { ConfigLoader } from '../core/config-loader.js';
import { NexusError } from '../core/errors.js';

export interface Article {
  title: string;
  author: string | null;
  url: string;
}

/**
 * News Service: Global headlines via NewsAPI.
 */
export class NewsService {
  private client: ApiClient;

  constructor() {
    this.client = new ApiClient('https://newsapi.org/v2');
  }

  async getTopHeadlines(category: string = 'general'): Promise<Article[]> {
    const key = ConfigLoader.get().NEWS_API_KEY;
    if (!key) {
      throw new NexusError('Headlines require a NEWS_API_KEY in .env');
    }
    const data = await this.client.get<{ articles: Article[] }>('/top-headlines', {
      params: { apiKey: key, category, country: 'us' },
    });
    return data.articles;
  }
}
