import { Request } from '@jackdouglas/ts-request';
import { Error, Log } from '@jackdouglas/ts-utilities/logger';

import { WalmartResponse } from '../interfaces/walmart';
import { BestBuyResponse } from '../interfaces/bestbuy';
import { BestBuyKey, WalmartKey } from '../config';

export const providers: any = {
  walmart: {
    url: `http://api.walmartlabs.com/v1/items?apiKey=${BestBuyKey}&upc=`,
    process: (response: WalmartResponse) => {
      if (response.errors) return;

      return response.items[0];
    },
  },
  bestbuy: {
    buildUrl: (barcode: string) => {
      return `https://api.bestbuy.com/v1/products(upc=${barcode})?format=json&show=all&apiKey=${WalmartKey}`;
    },
    process: (response: BestBuyResponse) => {
      if (response.error) {
        Error(JSON.stringify({ error: { code: response.error.code, status: response.error.status, message: response.error.message } }));
        return;
      }
      if (response.products.length === 0) return;

      return response.products[0];
    },
  },
};

export async function Lookup(barcode: string): Promise<any> {
  let data = {};
  let process;
  for (let provider in providers) {
    if (providers[provider].url) {
      const response = await Request(providers[provider].url + barcode, {
        method: 'GET',
      });

      process = providers[provider].process(response);
    } else {
      if (provider === 'bestbuy') {
        const response = await Request(providers[provider].buildUrl(barcode), {
          method: 'GET',
        });

        process = providers[provider].process(response);
      }
    }

    if (!process) data[provider] = null;
    else Log(`Item ${process.name} found at ${provider} at $${process.salePrice}`);

    data[provider] = process;
  }

  return data;
}
