import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { WeatherEvent } from './entities/weatherEvent.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { WeatherResponse } from './weather';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(WeatherEvent)
    private weatherEventRepository: Repository<WeatherEvent>,
  ) {}

  async findWeather(lat: number, lon: number): Promise<WeatherResponse> {
    const key = 'ca29f961319e9d2a9c47e7da1d80a888';
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${key}`;
    this.logger.log(url);
    const existing = await this.findByLatLong(lat, lon);
    this.logger.log(existing);

    if (existing) {
      return existing.response;
    } else {
      const { data } = await firstValueFrom(
        this.httpService.get<WeatherResponse>(url).pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
      );
      this.create(lat, lon, data);
      return data;
    }
  }

  create(lat: number, lon: number, response: WeatherResponse) {
    const weatherEvent = { lat, lon, response };
    this.weatherEventRepository.save(weatherEvent);
  }

  async findByLatLong(lat: number, lon: number): Promise<WeatherEvent | null> {
    const result = await this.weatherEventRepository.find({
      where: {
        lat: lat,
        lon: lon,
      },
    });
    return result[0];
  }
}
