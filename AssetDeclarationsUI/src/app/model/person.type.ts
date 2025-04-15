import { AssetDeclaration } from './assetDeclaration.type';
import { Party } from './party.type';
import { RealEstate } from './realEstate.type';

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
  realEstate?: RealEstate[];
};
