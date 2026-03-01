import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiError } from './errors.js';

/**
 * Robust API Client wrapper focusing on resilience.
 * Implements centralized interceptors for error mapping.
 */
export class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string, headers: Record<string, string> = {}) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      timeout: 10000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const message = 
          error.response?.data?.message || 
          error.response?.data?.error?.message || 
          error.message || 
          'External system connection timeout';
        
        throw new ApiError(message, error.response?.status);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }
}
