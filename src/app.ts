// Package import
import * as net from 'net';
import chalk from 'chalk';
import { Error, Log } from '@jackdouglas/ts-utilities/logger';

// Handlers
import { InitLog, ValidateResults, FormatResults, FindLowestResult } from './helpers/utils';
import { Validate } from './helpers/barcode';
import { Lookup } from './handlers/search';
import { RawLookupResults } from './interfaces/results';

let port = 58627;
                                             
// Search
net
  .createServer(async (socket: any) => {
    // Identify this client
    socket.name = '127.0.0.1' + ':' + port;

    socket.on('data', async (data: { toString: () => any }) => {
      // Convert the incoming barcode to a string for later use
      const barcode = data.toString();

      // Check to see if the data is a valid barcode
      const check = await Validate(barcode);
      if (!check) return Error('Scanned barcode is not valid');

      Log(`Searching for SKU: ${chalk.underline(barcode)}`);

      // Look up the barcode.
      const results: RawLookupResults = await Lookup(barcode);

      // Validate the results of the lookup
      const validate = await ValidateResults(results);
      if (validate === 0) return Error('No items could be found with that barcode');

      // Format the results
      const formattedResults = await FormatResults(barcode, results);

      // Order the results from cheapest to the most expensive.
      const lowestResult = await FindLowestResult(formattedResults);

      // Log the lowest result
      Log(`Lowest we could find ${lowestResult[0].value.name} is at: ${lowestResult[0].key} at $${lowestResult[0].value.price}`);
      // If the item is on sale then show how much would be saved.
      if (lowestResult[0].value.onSale) Log(`This item is on sale, you are saving $${lowestResult[0].value.dollarSavings} (${lowestResult[0].value.percentSavings}%)`);
    });
  })
  .listen(port);

InitLog(port);
