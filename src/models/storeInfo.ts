export interface StoreInfo {
  storeImages: string[];
  storeName: string;
  storeStar: number;
  postTitle: string;
  minCookTime: number;
  storeAddress: string;
  storePhone: string;
  postContent: string;
  isPicked: boolean;
  orderCount: number;
}

export const initialStoreInfo: StoreInfo = {
  storeImages: [""],
  storeName: "",
  storeStar: 0,
  postTitle: "",
  minCookTime: 0,
  storeAddress: "",
  storePhone: "",
  postContent: "",
  isPicked: false,
  orderCount: 0,
}