import { CashPosition } from './cashPosition.type';
import { RealEstate } from './realEstate.type';

export type AssetDeclaration = {
  id: number;
  netValue: number;
  date: Date;

  cashPositions?: CashPosition[];
  realEstate?: RealEstate[];
};
