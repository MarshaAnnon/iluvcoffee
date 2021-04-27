import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Injectable } from '@nestjs/common';

import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: "Frenchy's French Roast",
      brand: "Frenchy's",
      flavors: ['chocolate', 'coffee'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOneById(id: number) {
    return this.coffees.find((coffee) => coffee.id === +id);
  }

  create(createCoffeeDTO: CreateCoffeeDto) {
    this.coffees.push(createCoffeeDTO);
    return createCoffeeDTO;
  }

  update(id: number, updateCoffeeDTO: UpdateCoffeeDto) {
    this.findOneById(id);
    return updateCoffeeDTO;
  }

  remove(id: number) {
    const coffeeIndex = this.coffees.findIndex((coffee) => coffee.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
// The main idea of a provider is that it can inject dependencies.
// Services are where the meat of you business logic should be held along with any interaction with data sources.
// findOne() GET method takes one argument which represents an extracted "id" path parameter that you know is
// of Type "number". However, by default, every path parameter and query parameter, come over the network as a String.
// If you put id: number ValidationPipe will *try* to automatically convert the String identifier to a Number
