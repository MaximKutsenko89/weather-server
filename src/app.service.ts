import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { Response, Units } from './types';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('WEATHER_MODEL')
    private weatherModel: Model<Response>,
  ) {}

  async saveHistory(data: Response): Promise<void> {
    const existingRecord = await this.weatherModel.findOne({
      'coord.lon': data.coord.lon,
      'coord.lat': data.coord.lat,
      name: data.name,
      dt: data.dt,
    });

    if (!existingRecord) {
      const newData = new this.weatherModel(data);
      await newData.save();
    }
  }

  async getWeather(city: string, units: Units): Promise<Response> {
    try {
      const resp = await this.httpService.axiosRef.get<Response>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${process.env.API_KEY}`,
      );
      return resp.data;
    } catch (error) {
      throw new HttpException(
        {
          status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
          data: error.response?.data,
        },
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getHistory(limit: number = 100): Promise<Response[]> {
    return this.weatherModel.find().limit(limit).exec();
  }
  async deleteHistory(): Promise<any> {
    return this.weatherModel.deleteMany({});
  }
}
