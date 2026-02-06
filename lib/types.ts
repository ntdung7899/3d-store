export enum ProductType {
  FILE = 'FILE',
  PRINT = 'PRINT',
  BOTH = 'BOTH'
}

export enum FileFormat {
  STL = 'STL',
  OBJ = 'OBJ'
}

export enum MaterialType {
  PLA = 'PLA',
  ABS = 'ABS',
  PETG = 'PETG',
  RESIN = 'Resin'
}

export enum SizeOption {
  SMALL = 'Small',
  MEDIUM = 'Medium',
  LARGE = 'Large'
}

export interface Material {
  id: string;
  name: MaterialType;
  priceMultiplier: number;
  icon?: string;
}

export interface Color {
  id: string;
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  images: string[];
  type: ProductType;
  filePrice?: number;
  printBasePrice?: number;
  fileFormats?: FileFormat[];
  license?: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  popular?: boolean;
  category?: string;
}

export interface CartItem {
  product: Product;
  type: 'file' | 'print';
  quantity: number;
  selectedOptions?: {
    material?: Material;
    color?: Color;
    size?: SizeOption;
  };
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  shipping: number;
  total: number;
}
