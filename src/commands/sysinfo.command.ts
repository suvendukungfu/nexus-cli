import { BaseCommand } from './base.command.js';
import si from 'systeminformation';
import { Logger } from '../utils/logger.js';
import chalk from 'chalk';

/**
 * SysInfo Command: Hardware and OS metrics analysis.
 */
export class SysInfoCommand extends BaseCommand {
  protected name = 'sysinfo';
  protected description = 'Critical hardware and operating system metrics';

  protected async action(): Promise<void> {
    const os = await si.osInfo();
    const cpu = await si.cpu();
    const mem = await si.mem();

    console.log(chalk.blue('\n--- Hardware Intelligence Report ---'));
    console.log(chalk.bold('Platform:  '), os.platform, `(${os.distro})`);
    console.log(chalk.bold('Architecture:'), os.arch);
    console.log(chalk.bold('Engine:    '), cpu.manufacturer, cpu.brand, `@ ${cpu.speed}GHz`);
    console.log(chalk.bold('Memory:    '), (mem.total / (1024 ** 3)).toFixed(2), 'GB Total');
    console.log(chalk.blue('------------------------------------\n'));
  }
}
