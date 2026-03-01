import { BaseCommand } from './base.command.js';
import { QuoteService } from '../services/quote.service.js';
import chalk from 'chalk';

/**
 * Quote Command: Inspirational philosophy aggregation.
 */
export class QuoteCommand extends BaseCommand {
  protected name = 'quote';
  protected description = 'Dispatch a curated philosophical insight';

  private service = new QuoteService();

  protected async action(): Promise<void> {
    const q = await this.service.getRandom();
    console.log(`\n"${chalk.italic(q.content)}"`);
    console.log(` - ${chalk.bold(q.author)}\n`);
  }
}
