import { BusinessActivity } from './businessActivity.interface';
import { CashPosition } from './cashPosition.interface';
import { Income } from './income.interface';
import { Liability } from './liability.interface';
import { PersonalProperty } from './personalProperty.interface';
import { RealEstate } from './realEstate.interface';
import { Receivable } from './receivable.interface';
import { SecurityPosition } from './securityPosition.interface';

export interface AssetDeclaration {
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
