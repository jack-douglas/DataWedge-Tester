export interface Attributes {
  caResidentsPropWarningRequired: string;
  hasStateRestrictions: string;
  size: string;
}

export interface ImageEntity {
  thumbnailImage: string;
  mediumImage: string;
  largeImage: string;
  entityType: string;
}

export interface WalmartItem {
  itemId: number;
  parentItemId: number;
  name: string;
  upc: string;
  categoryPath: string;
  shortDescription: string;
  longDescription: string;
  brandName: string;
  thumbnailImage: string;
  mediumImage: string;
  largeImage: string;
  productTrackingUrl: string;
  size: string;
  productUrl: string;
  categoryNode: string;
  rhid: string;
  bundle: boolean;
  clearance: boolean;
  preOrder: boolean;
  stock: string;
  attributes: Attributes;
  addToCartUrl: string;
  affiliateAddToCartUrl: string;
  freeShippingOver35Dollars: boolean;
  imageEntities: ImageEntity[];
  availableOnline: boolean;
  msrp: number;
  price: number;
}

export interface WalmartError {
  code: number;
  message: string;
}

export interface WalmartResponse {
  items: WalmartItem[];
  errors?: WalmartError[];
}
