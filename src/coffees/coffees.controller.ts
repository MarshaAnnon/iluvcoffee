import { CoffeesService } from './coffees.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `This action returns all the coffees. Limit: ${limit}, offset ${offset}.`;
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return `This action returns #${id} coffee`;
  }

  @Post()
  create(@Body() body) {
    return body;
    //return `This action creates a coffee`
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body) {
    return `This action updates #${id} coffee`;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return `This action removes #${id} coffee`;
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
