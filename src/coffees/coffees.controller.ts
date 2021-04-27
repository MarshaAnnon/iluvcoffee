import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  //   Query,
  //   Res,
} from '@nestjs/common';

import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Get()
  findAll() {
    const allCoffees = this.coffeesService.findAll();
    if (!allCoffees) {
      throw new NotFoundException(
        `Uh-oh, something went wrong, coffees not found.`,
      );
    }
    return allCoffees;
  }
  //   findAll(@Query() paginationQuery) {

  // const { limit, offset } = paginationQuery;

  @Get(':id')
  findOneById(@Param('id') id: number) {
    console.log(typeof id);
    const coffee = this.coffeesService.findOneById(id);
    if (!coffee) {
      throw new NotFoundException(
        `Uh-oh, something went wrong, coffee #${id} not found.`,
      );
    }
    return coffee;
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto instanceof CreateCoffeeDto);
    return this.coffeesService.create(createCoffeeDto);
    // if (!createdCoffee) {
    //   throw new BadRequestException(
    //     `Looks like you've missed some info, please try again...`,
    //   );
    // }
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coffeesService.remove(id);
  }
}

// constructor(private readonly coffeesService: CoffeesService) {}
// the private access modifier - this TypeScript shorthand allows you to both declare and initialize the
// coffeesService immediately in the same location & making it only accessible within the class itself.
// readonly is a best practice helps ensure you aren't modifying the service referenced & only accessing
// things from it
// nest you are naming your parameter - calling it coffeesService of type CoffeesService

// @Get()
//   findAll(@Res() response) {
//     response.status(200).send('This action returns all the coffees');
//   }
// 1. Here I am importing the @Res() decorator and naming the parameter response
// 2. Although this approach works great & allows more flexibility by providing full control
// of the response object, it should be used with care. You lose compatibility with Nest features
//that depend on Nest standard response handling, such as inceptors & the @HttpCode() decorator.
//  You also risk becoming platform dependant. Your code is also harder to test
// as you'll have to mock the response object as well. BEST PRACTICE - use the Nest standard approach
// when dealing with responses whenever possible.

//this signifies that I'm expecting a dynamic root param "id"
// @Get(':id')
// findOneById(@Param('id') id: number) {
//   return `This action returns #${id} coffee`;
// }
