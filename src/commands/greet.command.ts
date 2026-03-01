import { BaseCommand } from './base.command.js';
import { Logger } from '../utils/logger.js';
import { Validator } from '../utils/validator.js';

/**
 * Greet Command: Professional session initialization.
 * Displays a branded banner greeting.
 */
export class GreetCommand extends BaseCommand {
  protected name = 'greet <name>';
  protected description = 'Initialization of the developer workspace session';

  protected async action(name: string): Promise<void> {
    Validator.nonEmptyString(name, 'Session user identity');
    Logger.banner(`Nexus Terminal Operation: Active - ${name}`);
    Logger.success('Developer session identity validated.');
  }
}
