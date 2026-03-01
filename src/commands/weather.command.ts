import { BaseCommand } from './base.command.js';
import { WeatherService } from '../services/weather.service.js';
import ora from 'ora';
import chalk from 'chalk';

/**
 * Weather Command: Climate telemetry reporting.
 */
export class WeatherCommand extends BaseCommand {
  protected name = 'weather <city>';
  protected description = 'Current climate telemetry for the specified region';

  private service = new WeatherService();

  protected async action(city: string): Promise<void> {
    const spinner = ora(`Analyzing climate for ${city}...`).start();
    const data = await this.service.getCurrentWeather(city);
    spinner.stop();

    console.log(chalk.yellow('\n--- Climate Intelligence Report ---'));
    console.log(chalk.bold('Region:   '), data.name);
    console.log(chalk.bold('Temp:     '), `${data.main.temp}°C`);
    console.log(chalk.bold('Status:   '), data.weather[0].description);
    console.log(chalk.bold('Humidity: '), `${data.main.humidity}%`);
    console.log(chalk.yellow('-----------------------------------\n'));
  }
}
