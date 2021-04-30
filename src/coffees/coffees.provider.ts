import { Connection } from 'typeorm';
import { Coffee } from './entities/coffee.entity';

export const coffeeProviders = [
  {
    provide: 'COFFEE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Coffee),
    inject: ['DATABASE_CONNECTION'],
  },
];
