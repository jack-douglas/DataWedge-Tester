export interface BestBuyResponse {
  products: BestBuyItem[];
  error: Error;
  // Random shit i dont care about but nice to know about
  from?: number;
  to?: number;
  currentPage?: number;
  total?: number;
  totalPages?: number;
  queryTime?: string;
  totalTime?: string;
  partial?: boolean;
  canonicalUrl?: string;
}

interface Error {
  code: number;
  status: string;
  message: string;
  examples?: string[];
}

export interface BestBuyItem {
  sku: number;
  upc: string;
  name: string;
  manufacturer: string;
  preowned: boolean;
  condition: string;
  salePrice: number;
  regularPrice: number;
  onlineAvailability: boolean;
  onSale: boolean;
  dollarSavings: number;
  percentSavings: string;
}
