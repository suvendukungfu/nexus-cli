import { BaseCommand } from './base.command.js';
import { CryptoService } from '../services/crypto.service.js';
import ora from 'ora';
import chalk from 'chalk';

/**
 * Crypto Command: Market price intelligence.
 */
export class CryptoCommand extends BaseCommand {
  protected name = 'crypto <coin>';
  protected description = 'Real-time financial telemetry for crypto assets';

  private service = new CryptoService();

  protected async action(coin: string): Promise<void> {
    const spinner = ora(`Fetching market data for ${coin}...`).start();
    const data = await this.service.getPrice(coin);
    spinner.stop();

    const change = data.price_change_percentage_24h;
    const changeColor = change >= 0 ? chalk.green : chalk.red;

    console.log(chalk.cyan('\n--- Market Intelligence Report ---'));
    console.log(chalk.bold('Asset:   '), `${data.symbol.toUpperCase()} (${data.id})`);
    console.log(chalk.bold('Price:   '), `$${data.current_price.toLocaleString()}`);
    console.log(chalk.bold('24h Mod: '), changeColor(`${change.toFixed(2)}%`));
    console.log(chalk.cyan('-----------------------------------\n'));
  }
}
