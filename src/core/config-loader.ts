import dotenv from 'dotenv';
import { z } from 'zod';
import { ConfigError } from './errors.js';

dotenv.config();

/**
 * Zod Schema for environment validation.
 * Ensures the CLI environment is healthy before service instantiation.
 */
const ConfigSchema = z.object({
  GITHUB_TOKEN: z.string().optional(),
  OPENWEATHER_API_KEY: z.string().optional(),
  NEWS_API_KEY: z.string().optional(),
  COINGECKO_API_KEY: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MEOW_MODE: z.coerce.boolean().default(false),
});

export class ConfigLoader {
  private static instance: z.infer<typeof ConfigSchema>;

  static get(): z.infer<typeof ConfigSchema> {
    if (!this.instance) {
      const result = ConfigSchema.safeParse(process.env);
      if (!result.success) {
        throw new ConfigError('Environment validation failed: ' + result.error.message);
      }
      this.instance = result.data;
    }
    return this.instance;
  }
}
