import { Connection } from 'mongoose';
import { Weather } from 'src/db/schemas/weather.schema';

export const weatherProviders = [
  {
    provide: 'WEATHER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Weather', Weather),
    inject: ['DATABASE_CONNECTION'],
  },
];
