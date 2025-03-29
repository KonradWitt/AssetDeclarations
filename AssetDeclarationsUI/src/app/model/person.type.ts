import { AssetDeclaration } from './assetDeclaration.type';
import { Party } from './party.type';

export type Person = {
  id: number;
  link: string;
  name: string;
  placeOfBirth: string;
  dateOfBirth: Date;
  imageUrl: string;

  partyId?: number;
  party?: Party;

  assetDeclarations?: AssetDeclaration[];
};

export const defaultPerson = {
  id: 0,
  name: '',
  link: '',
  placeOfBirth: '',
  imageUrl: '',
  dateOfBirth: new Date(),
  netWorth: 0,
};
