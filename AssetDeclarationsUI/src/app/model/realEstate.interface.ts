import { Person } from './person.interface';

export interface RealEstate {
  description: string;
  value: number;
  legalTitle: string;
  owner: Person | undefined;
};
