import { PersonIdentifier } from "./personIdentifier.interface";

export interface PersonHighlight extends PersonIdentifier {
  imageUrl: string;
  netWorth: number;
}
