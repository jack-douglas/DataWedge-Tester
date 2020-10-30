import { WalmartItem } from './walmart';
import { BestBuyItem } from './bestbuy';

export interface RawLookupResults {
  walmart: any | null;
  bestbuy: any | null;
  other?: any;
}

export interface LookupResults {
  walmart: LookupResult;
  bestbuy: LookupResult;
}

export interface LookupResult {
  upc: string;
  price: number;
  manufacturer: string;
  name: string;
  availableOnline: boolean;
  condition: string | null;
  preowned: boolean | null;
}
