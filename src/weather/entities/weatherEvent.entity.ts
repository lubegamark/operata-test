import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { WeatherResponse } from '../weather';

@Entity()
@Unique(['lat', 'lon'])
export class WeatherEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 13, scale: 6 })
  lat: number;

  @Column({ type: 'decimal', precision: 13, scale: 6 })
  lon: number;

  @Column('jsonb')
  response: WeatherResponse;
}
