import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './database.providers';
import { weatherProviders } from './weather.providers'; // Import weatherProviders

@Module({
  imports: [ConfigModule],
  providers: [...databaseProviders, ...weatherProviders], // Add weatherProviders here
  exports: [...databaseProviders, ...weatherProviders], // Export weatherProviders
})
export class DatabaseModule {}
