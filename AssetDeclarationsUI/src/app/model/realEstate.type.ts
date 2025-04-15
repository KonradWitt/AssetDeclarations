import { Person } from './person.type';

export type RealEstate = {
  id: number;
  description: string;
  value: number;
  legalTitle: string;
  owner: Person | undefined;
};
