import { Party } from './party.interface';
import { PersonIdentifier } from './personIdentifier.interface';

export interface PersonListed extends PersonIdentifier {
  imageUrl: string;
  netWorth : number;
  party: Party;
}
