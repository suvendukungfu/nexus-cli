import { ApiClient } from '../core/api-client.js';
import { ConfigLoader } from '../core/config-loader.js';

export interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  html_url: string;
}

/**
 * GitHub Service: High-performance repository and profile analysis.
 * Implements token-based authorization for professional rate profiles.
 */
export class GitHubService {
  private client: ApiClient;

  constructor() {
    const config = ConfigLoader.get();
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
    };
    if (config.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${config.GITHUB_TOKEN}`;
    }
    this.client = new ApiClient('https://api.github.com', headers);
  }

  async getUser(username: string): Promise<GitHubUser> {
    return this.client.get<GitHubUser>(`/users/${username}`);
  }
}
