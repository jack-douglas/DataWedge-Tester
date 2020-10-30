export interface barcodeType {
  id: string;
  name: string;
  match: RegExp;
}

export const barcodeTypes: { [key: string]: barcodeType } = {
  upc_a: {
    id: 'upc_a',
    name: 'Universal Product Code Version A',
    match: /[0-9]{12}/,
  },
  upc_e: {
    id: 'upc_e',
    name: 'Universal Product Code Version E',
    match: /[0-9]{7}/,
  },
};
