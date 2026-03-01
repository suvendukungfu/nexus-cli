#!/usr/bin/env node
import { Command } from 'commander';
import { Logger } from './utils/logger.js';
import { GreetCommand } from './commands/greet.command.js';
import { WeatherCommand } from './commands/weather.command.js';
import { GitHubCommand } from './commands/github.command.js';
import { QuoteCommand } from './commands/quote.command.js';
import { JokeCommand } from './commands/joke.command.js';
import { CryptoCommand } from './commands/crypto.command.js';
import { NewsCommand } from './commands/news.command.js';
import { FileInfoCommand } from './commands/fileinfo.command.js';
import { SysInfoCommand } from './commands/sysinfo.command.js';
import { TodoCommand } from './commands/todo.command.js';

/**
 * Nexus CLI Entry Point.
 * Orchestrates the registration of operational commands and global failure lifecycle.
 */
const program = new Command();

program
  .name('nexus')
  .description('Production-grade developer productivity CLI')
  .version('1.0.0-PRO');

// Registration Stack
const commands = [
  new GreetCommand(),
  new WeatherCommand(),
  new GitHubCommand(),
  new QuoteCommand(),
  new JokeCommand(),
  new CryptoCommand(),
  new NewsCommand(),
  new FileInfoCommand(),
  new SysInfoCommand(),
  new TodoCommand(),
];

// Execute Registration
commands.forEach((cmd) => cmd.register(program));

// Rejection Lifecycle Hook
process.on('unhandledRejection', (reason) => {
  Logger.error(
    'Critical unhandled operational fault:',
    reason instanceof Error ? reason : new Error(String(reason))
  );
});

program.parse(process.argv);

// Auto-trigger help for empty parameters
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
