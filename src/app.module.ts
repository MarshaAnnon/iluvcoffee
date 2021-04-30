import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass1234',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// TypeOrmModule.forRoot() lets you configure the connection to TypeOrm
// autoLoadEntities: true, this helps load modules automatically instead of specifying the entities Array
// synchronize: true, this ensures that your TypeOrm entities will be synched with the db every time. This is
// great for development, BUT MAKE SURE YOU DISABLE THIS WHEN IN PRODUCTION
