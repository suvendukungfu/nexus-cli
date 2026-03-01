import chalk from 'chalk';
import boxen from 'boxen';

/**
 * Nexus Logger: Production-grade styled CLI logging system.
 * Supports info, success, warning, and error states with platform-aware symbols.
 */
export class Logger {
  static info(msg: string): void {
    console.log(chalk.blue('ℹ'), msg);
  }

  static success(msg: string): void {
    console.log(chalk.green('✔'), msg);
  }

  static warn(msg: string): void {
    console.log(chalk.yellow('⚠'), msg);
  }

  static error(msg: string, error?: unknown): void {
    console.error(chalk.red('✖'), chalk.red(msg));
    if (error instanceof Error && process.env.NODE_ENV === 'development') {
      console.error(chalk.dim(error.stack));
    }
  }

  static banner(title: string): void {
    console.log(
      boxen(chalk.bold.magenta(title), {
        title: 'Nexus Intelligence Hub',
        titleAlignment: 'center',
        padding: 1,
        margin: 1,
        borderStyle: 'double',
        borderColor: 'magenta',
      })
    );
  }
}
