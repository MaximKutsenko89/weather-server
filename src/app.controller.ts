import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { Units } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/')
  startRoute(@Res() res: Response) {
    res.status(200).json({ message: 'Server is running' });
  }
  @Get('/api/v1/weather')
  async getWeather(
    @Res() res: Response,
    @Query('city') city: string,
    @Query('units') units: Units,
  ): Promise<void> {
    try {
      const data = await this.appService.getWeather(city, units);
      await this.appService.saveHistory(data);
      res.status(HttpStatus.OK).json({ data, error: null });
    } catch (error) {
      const statusCode = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      res.status(statusCode).json({ data: null, error });
    }
  }

  @Get('/api/v1/weather/history')
  async getHistory(
    @Res() res: Response,
    @Query('limit') limit: number,
  ): Promise<void> {
    try {
      const history = await this.appService.getHistory(limit);

      res.status(HttpStatus.OK).json({ data: history, error: null });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ data: null, error: error });
    }
  }
  @Delete('/api/v1/weather/history/delete-all')
  async deleteHistory(@Res() res: Response, @Body('token') token: string) {
    try {
      if (!token || token !== process.env.ACCESS_TOKEN) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Incorrect token ', error: null });
      } else {
        await this.appService.deleteHistory();
        res
          .status(HttpStatus.OK)
          .json({ message: 'history was deleted', error: null });
      }
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: null, error: error });
    }
  }
}
