import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherEvent } from './entities/weatherEvent.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([WeatherEvent])],
  providers: [WeatherService],
  controllers: [WeatherController],
  exports: [TypeOrmModule],
})
export class WeatherModule {}
