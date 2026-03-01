import { BaseCommand } from './base.command.js';
import { TodoService } from '../services/todo.service.js';
import chalk from 'chalk';
import { Logger } from '../utils/logger.js';

/**
 * Todo Command: Operational task lifecycle management.
 * Supports add, list, and removal of internal task artifacts.
 */
export class TodoCommand extends BaseCommand {
  protected name = 'todo <action>';
  protected description = 'Task lifecycle management: add, list, delete';

  private service = new TodoService();

  protected async action(action: string, arg?: string): Promise<void> {
    switch (action) {
      case 'add':
        if (!arg) throw new Error('Task detail required for operation: add');
        await this.service.add(arg);
        Logger.success('Task artifact successfully queued.');
        break;

      case 'list':
        const todos = await this.service.getTodos();
        console.log(chalk.bold.blue('\n--- Task Operational Stack ---'));
        todos.length === 0 
          ? console.log(chalk.dim('No active tasks detected.'))
          : todos.forEach(t => console.log(`${chalk.yellow(t.id)}: ${t.task}`));
        console.log(chalk.bold.blue('-------------------------------\n'));
        break;

      case 'remove':
        if (!arg) throw new Error('Task ID required for operation: remove');
        await this.service.remove(arg);
        Logger.success('Task artifact purged from stack.');
        break;

      default:
        Logger.error('Action must be add, list, or remove');
    }
  }
}
