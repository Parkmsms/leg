export interface StoreMenu1 {
  id: number;
  bigItem: string;
  description: string;
  price: number;
  image: string;
  isExhausted: boolean;
}

export const initialStoreMenu1: StoreMenu1 = {
  id: 0,
  bigItem: "",
  description: "",
  price: 0,
  image: "",
  isExhausted: false
}