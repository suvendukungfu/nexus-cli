import fs from 'fs-extra';
import { Validator } from '../utils/validator.js';

/**
 * File Service: High-speed file statistical analysis.
 */
export class FileService {
  async getStats(filePath: string) {
    Validator.exists(filePath, 'Target file path');
    return fs.stat(filePath);
  }
}
