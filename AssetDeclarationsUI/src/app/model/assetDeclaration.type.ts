import { CashPosition } from './cashPosition.type';

export type AssetDeclaration = {
  id: number;
  netValue: number;
  date: Date;

  cashPositions?: CashPosition[];
};
