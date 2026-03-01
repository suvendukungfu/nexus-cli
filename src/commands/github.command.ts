import { BaseCommand } from './base.command.js';
import { GitHubService } from '../services/github.service.js';
import ora from 'ora';
import chalk from 'chalk';

/**
 * GitHub Command: Open-source profile intelligence.
 */
export class GitHubCommand extends BaseCommand {
  protected name = 'github <username>';
  protected description = 'Fetch GitHub developer profile analytics';

  private service = new GitHubService();

  protected async action(username: string): Promise<void> {
    const spinner = ora(`Inspecting profile: ${username}...`).start();
    const user = await this.service.getUser(username);
    spinner.succeed(`Intelligence retrieved for ${user.login}`);

    console.log(chalk.gray('\n-----------------------------------'));
    console.log(chalk.bold('Identity:'), user.name || user.login);
    console.log(chalk.bold('Bio:     '), user.bio || 'Silence in the terminal');
    console.log(chalk.bold('Repos:   '), chalk.cyan(user.public_repos));
    console.log(chalk.bold('Follows: '), chalk.cyan(user.followers));
    console.log(chalk.bold('Url:     '), chalk.blue.underline(user.html_url));
    console.log(chalk.gray('-----------------------------------\n'));
  }
}
