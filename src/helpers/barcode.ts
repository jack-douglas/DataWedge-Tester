import { barcodeType, barcodeTypes } from '../interfaces/barcode';

export async function Validate(barcode: string): Promise<barcodeType | undefined> {
  try {
    for (let barcodeName in barcodeTypes) {
      let barcodeObj = barcodeTypes[barcodeName];

      // if the barcode matches the match regex. It will stop.
      if (barcode.match(barcodeObj.match)) return barcodeObj;
    }
    throw { code: 'no_match_found' };
  } catch (e) {
    return;
  }
}
