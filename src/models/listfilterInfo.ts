export interface StoreParams {
  foodType: string;
  keyword: string;
  sort: string;
  lastId: number;
}

export const intialStorePrams: StoreParams = {
  foodType: "전체",
  keyword: "",
  sort: "거리",
  lastId: 0,
}