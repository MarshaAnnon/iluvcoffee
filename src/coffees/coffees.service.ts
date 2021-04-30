import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  async findAll() {
    return this.coffeeRepository.find();
  }

  async findOneById(id: number) {
    const coffee = await this.coffeeRepository.findOne(id);
    return coffee;
  }

  create(createCoffeeDTO: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(createCoffeeDTO);
    return this.coffeeRepository.save(coffee);
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.findOneById(id);
    return this.coffeeRepository.remove(coffee);
  }
}
// The main idea of a provider is that it can inject dependencies.
// Services are where the meat of you business logic should be held along with any interaction with data sources.
// findOne() GET method takes one argument which represents an extracted "id" path parameter that you know is
// of Type "number". However, by default, every path parameter and query parameter, come over the network as a String.
// If you put id: number ValidationPipe will *try* to automatically convert the String identifier to a Number
// preload() (line31) this method creates a new entity based on the object passed into it. It first looks to
// see if an Entity ALREADY exists in the db, & if so, retrieves it & everything related to it. If an entity exists
// already, preload replaces all of the values with the new ones passed in here in the UpdateCoffeeDto. NOTE - the preload
// method will return undefined if the "id" of the entity passed in was NOT found in the db. MAKE SURE YOU always test whether
// the result is "undefined" & if so, throw a notFoundException
