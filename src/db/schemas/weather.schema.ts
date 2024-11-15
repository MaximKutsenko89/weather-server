import { Schema } from 'mongoose';

export const CoordSchema = new Schema({
  lon: { type: Number, required: true }, // Longitude
  lat: { type: Number, required: true }, // Latitude
});
export const WeatherSchema = new Schema({
  id: { type: Number, required: true },
  main: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
});
export const MainSchema = new Schema({
  temp: { type: Number, required: true },
  feels_like: { type: Number, required: true },
  temp_min: { type: Number, required: true },
  temp_max: { type: Number, required: true },
  pressure: { type: Number, required: true },
  humidity: { type: Number, required: true },
  sea_level: { type: Number, required: true },
  grnd_level: { type: Number, required: true },
});
export const SysSchema = new Schema({
  type: { type: Number, required: false },
  id: { type: Number, required: false },
  country: { type: String, required: true },
  sunrise: { type: Number, required: true },
  sunset: { type: Number, required: true },
});

export const WindSchema = new Schema({
  speed: { type: Number, required: true },
  deg: { type: Number, required: true },
  gust: { type: Number, required: false },
});
export const CloudsSchema = new Schema({
  all: { type: Number, required: true },
});
export const Weather = new Schema({
  coord: { type: CoordSchema, required: true },
  weather: { type: [WeatherSchema], required: true },
  base: { type: String, required: true },
  main: { type: MainSchema, required: true },
  visibility: { type: Number, required: true },
  wind: { type: WindSchema, required: true },
  clouds: { type: CloudsSchema, required: true },
  dt: { type: Number, required: true },
  sys: { type: SysSchema, required: true },
  timezone: { type: Number, required: true },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  cod: { type: Number, required: true },
});
