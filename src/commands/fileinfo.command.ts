import { BaseCommand } from './base.command.js';
import { FileService } from '../services/file.service.js';
import chalk from 'chalk';
import path from 'path';

/**
 * FileInfo Command: Local file auditing.
 */
export class FileInfoCommand extends BaseCommand {
  protected name = 'fileinfo <filename>';
  protected description = 'Inspect local file statistics and metadata';

  private service = new FileService();

  protected async action(filename: string): Promise<void> {
    const stats = await this.service.getStats(filename);
    const basename = path.basename(filename);

    console.log(chalk.magenta('\n--- File Intelligence Audit ---'));
    console.log(chalk.bold('Identity:    '), basename);
    console.log(chalk.bold('Scale:       '), (stats.size / 1024).toFixed(2), 'KB');
    console.log(chalk.bold('Modification:'), stats.mtime.toLocaleString());
    console.log(chalk.bold('Category:    '), stats.isDirectory() ? 'Directory' : 'Sequential File');
    console.log(chalk.magenta('-------------------------------\n'));
  }
}
