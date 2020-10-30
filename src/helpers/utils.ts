import { Log } from '@jackdouglas/ts-utilities/modules/logger';
import { RawLookupResults, LookupResults } from '../interfaces/results';

export async function InitLog(port: any): Promise<void> {
  console.clear();
  Log(`Scanner server running at port 127.0.0.1:${port}`);
  Log('-----------------------------------------------');

  return;
}

export async function ValidateResults(results: RawLookupResults): Promise<number> {
  let numberFound: number = 0;
  for (let result in results) {
    if (results[result]) numberFound++;
  }

  return numberFound;
}

export async function FormatResults(barcode: string, results: RawLookupResults): Promise<any> {
  let formattedResults = {};
  for (let result in results) {
    switch (result) {
      case 'bestbuy':
        if (!results[result]) break;
        formattedResults[result] = {
          upc: barcode,
          price: results[result].salePrice,
          manufacturer: results[result].manufacturer,
          name: results[result].name,
          availableOnline: results[result].onlineAvailability,
          condition: results[result].condition,
          preowned: results[result].preowned,
          onSale: results[result].onSale,
          dollarSavings: results[result].dollarSavings,
          percentSavings: results[result].percentSavings,
        };
        break;
      case 'walmart':
        if (!results[result]) break;
        formattedResults[result] = {
          upc: barcode,
          price: results[result].salePrice,
          manufacturer: results[result].brandName,
          name: results[result].name,
          availableOnline: results[result].availableOnline,
          condition: null,
          preowned: null,
        };
        break;
    }
  }

  return formattedResults;
}

export async function FindLowestResult(results: LookupResults): Promise<any> {
  let sorted: any = [];
  for (let result in results) {
    if (results.hasOwnProperty(result)) {
      sorted.push({
        key: result,
        value: results[result],
      });
    }
  }
  return sorted.sort((a, b) => {
    return a.value.price - b.value.price;
  });
}
