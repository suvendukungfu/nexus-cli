import fs from 'fs-extra';
import { ValidationError } from '../core/errors.js';

/**
 * Nexus Validator: Centralized schema-less input validation.
 * Focuses on clinical validation before command execution.
 */
export class Validator {
  static nonEmptyString(val: string, label: string): void {
    if (!val || val.trim().length === 0) {
      throw new ValidationError(`${label} cannot be an empty sequence.`);
    }
  }

  static exists(path: string, label: string): void {
    if (!fs.existsSync(path)) {
      throw new ValidationError(`${label} reference not found: ${path}`);
    }
  }

  static enumValue<T>(val: T, allowed: T[], label: string): void {
    if (!allowed.includes(val)) {
      throw new ValidationError(`${label} contains unsupported value: ${val}.`);
    }
  }
}
