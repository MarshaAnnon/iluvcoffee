import { Injectable } from '@nestjs/common';

import { Coffee } from './entities/coffee.entity';

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

  create(createCoffeeDTO: any) {
    this.coffees.push(createCoffeeDTO);
  }

  update(id: number, updateCoffeeDTO: any) {
    const existingCoffee = this.findOneById(id);
    if (existingCoffee) {
      // update the existing coffee
    }
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
