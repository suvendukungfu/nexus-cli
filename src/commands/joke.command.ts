import { BaseCommand } from './base.command.js';
import { JokeService } from '../services/joke.service.js';
import chalk from 'chalk';

/**
 * Joke Command: Casual humor telemetry.
 */
export class JokeCommand extends BaseCommand {
  protected name = 'joke';
  protected description = 'Automated humor pulse check';

  private service = new JokeService();

  protected async action(): Promise<void> {
    const j = await this.service.getRandom();
    console.log(`\n${chalk.bold.yellow(j.setup)}`);
    // Simulated delay for comedic timing
    await new Promise(r => setTimeout(r, 1500));
    console.log(`${chalk.green(j.punchline)}\n`);
  }
}
