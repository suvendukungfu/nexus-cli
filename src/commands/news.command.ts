import { BaseCommand } from './base.command.js';
import { NewsService } from '../services/news.service.js';
import ora from 'ora';
import chalk from 'chalk';

/**
 * News Command: Global headline telemetry.
 */
export class NewsCommand extends BaseCommand {
  protected name = 'news [category]';
  protected description = 'Top headlines in global telemetry categories';

  private service = new NewsService();

  protected async action(category: string): Promise<void> {
    const spinner = ora(`Aggregating global headlines for [${category || 'general'}]...`).start();
    const articles = await this.service.getTopHeadlines(category);
    spinner.succeed(`Aggregated ${articles.length} news artifacts.`);

    console.log(chalk.green('\n--- Global Intelligence Feed ---'));
    articles.slice(0, 5).forEach((a, i) => {
      console.log(`${chalk.bold(i + 1 + '.')} ${a.title}`);
      console.log(chalk.dim(`   Url: ${a.url}\n`));
    });
    console.log(chalk.green('--------------------------------\n'));
  }
}
