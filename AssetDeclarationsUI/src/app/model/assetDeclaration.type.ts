import { BusinessActivity } from './businessActivity.type';
import { CashPosition } from './cashPosition.type';
import { Income } from './income.type';
import { Liability } from './liability.type';
import { PersonalProperty } from './personalProperty.type';
import { RealEstate } from './realEstate.type';
import { Receivable } from './receivable.type';
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
  liabilities: Liability[];
  receivables: Receivable[];
  businessActivities: BusinessActivity[];
};
