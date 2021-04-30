import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Flavor } from './flavor.entity';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees)
  @Column('json', { nullable: true })
  flavors: string[];
}

// @Entity() sql table === 'coffee'
// @Column('json', { nullable: true }) with this in place TypeOrm now knows that flavor should store arrays
// as JSON & to make this column optional in our db table
// @JoinTable() This helps specify the OWNER side of the relationship, in this case it's the Coffee Entity
// @ManyToMany((type) => Flavor) the first parameter establishes the 'Type' for the relation. This is just a
// function that returns a reference to the 'related' Entity, in this case the Flavor Entity.
// the next parameter, pass in an arrow function that returns the related entity & specify what property
// needs to be selected that is the 'inverse' side of the relationship. I.E. What is coffee inside of
// the Flavor Entity?
