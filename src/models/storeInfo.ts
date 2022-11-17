export interface StoreInfo {
  postImages: string[];
  storeName: string;
  storeStar: number;
  postTitle: string;
  cookTimeAvg: number;
  storeAddress: string;
  storePhone: string;
  postContent: string;
  isPicked: boolean;
  orderCount: number;
}

export const initialStoreInfo: StoreInfo = {
  postImages: [""],
  storeName: "",
  storeStar: 0,
  postTitle: "",
  cookTimeAvg: 0,
  storeAddress: "",
  storePhone: "",
  postContent: "",
  isPicked: false,
  orderCount: 0,
}