import { Person } from './person.interface';

export interface RealEstate {
  id: number;
  description: string;
  value: number;
  legalTitle: string;
  owner: Person | undefined;
};
