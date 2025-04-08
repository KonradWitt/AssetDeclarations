import { CashPosition } from './cashPosition.type';
import { Income } from './income.type';
import { PersonalProperty } from './personalProperty.type';
import { RealEstate } from './realEstate.type';
import { SecurityPosition } from './securityPosition.type';

export type AssetDeclaration = {
  id: number;
  netValue: number;
  date: Date;
  documentUrl: string;

  cashPositions: CashPosition[];
  realEstate: RealEstate[];
  personalProperties: PersonalProperty[];
  incomes: Income[];
  securityPositions: SecurityPosition[];
};
