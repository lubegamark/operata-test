import { Controller, Get, Logger, Query, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}
  private readonly logger = new Logger(WeatherController.name);

  @Get('')
  @UseGuards(AuthGuard)
  @Throttle(1, 60)
  queryWeather(@Query('lat') lat: number, @Query('lon') lon: number) {
    return this.weatherService.findWeather(lat, lon);
  }
}
