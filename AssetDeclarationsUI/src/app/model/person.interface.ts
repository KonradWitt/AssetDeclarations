import { AssetDeclaration } from './assetDeclaration.interface';
import { Party } from './party.interface';
import { RealEstate } from './realEstate.interface';

export interface Person {
  id: number;
  link: string;
  fullName: string;
  lastName: string;
  placeOfBirth: string;
  dateOfBirth: Date;
  imageUrl: string;

  partyId?: number;
  party?: Party;

  assetDeclarations?: AssetDeclaration[];
  realEstate?: RealEstate[];
};
