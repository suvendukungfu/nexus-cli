import { ApiClient } from '../core/api-client.js';

export interface CryptoPrice {
  id: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

/**
 * Crypto Service: Financial asset tracking through CoinGecko.
 */
export class CryptoService {
  private client: ApiClient;

  constructor() {
    this.client = new ApiClient('https://api.coingecko.com/api/v3');
  }

  async getPrice(coin: string): Promise<CryptoPrice> {
    const data = await this.client.get<CryptoPrice[]>('/coins/markets', {
      params: { vs_currency: 'usd', ids: coin.toLowerCase() },
    });
    if (data.length === 0) {
      throw new Error(`Coin reference not located: ${coin}`);
    }
    return data[0];
  }
}
