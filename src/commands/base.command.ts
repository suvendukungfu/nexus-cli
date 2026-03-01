import { Command } from 'commander';
import { Logger } from '../utils/logger.js';
import { NexusError } from '../core/errors.js';

/**
 * Nexus BaseCommand Abstract Class.
 * Implements Template Method pattern for command registration and action execution.
 * Provides a global error boundary for individual command actions.
 */
export abstract class BaseCommand {
  protected abstract name: string;
  protected abstract description: string;
  protected abstract action(...args: any[]): Promise<void>;

  /**
   * Universal registration entry point for Commander.js.
   */
  public register(program: Command): void {
    const cmd = program.command(this.name).description(this.description);
    this.configure(cmd);
    cmd.action(async (...args) => {
      try {
        await this.action(...args);
      } catch (error) {
        this.handleError(error);
      }
    });
  }

  /**
   * Hook for adding command-specific options or arguments.
   */
  protected configure(command: Command) {}

  /**
   * Centralized error handler for the command's lifecyle.
   */
  protected handleError(error: unknown): void {
    if (error instanceof NexusError) {
      Logger.error(error.message);
    } else if (error instanceof Error) {
      Logger.error(`Command Fault: ${error.message}`, error);
    } else {
      Logger.error('Incurred an opaque operational failure.');
    }
    process.exit(1);
  }
}
