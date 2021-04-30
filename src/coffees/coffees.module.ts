import { Flavor } from './entities/flavor.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Coffee } from './entities/coffee.entity';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}

// imports: [TypeOrmModule.forFeature([coffee])], Adds Coffee Entity to TypeOrmModule.forFeature
// the use of forFeature() registers TypeOrm in this child module. In the main AppModule you use forRoot,
// which you only do once in the parent.
