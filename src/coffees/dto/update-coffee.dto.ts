import { PartialType } from '@nestjs/mapped-types';

import { CreateCoffeeDto } from './create-coffee.dto';

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
//  This PartialType function returns the type of class you have passed in
// with all the fields marked optional. It also inherits all the validation
// rules applied via decorators
