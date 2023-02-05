export interface StoreParams {
  foodType: string;
  search: string;
  sort: string;
  lastId: number;
}

export const intialStorePrams: StoreParams = {
  foodType: "전체",
  search: "",
  sort: "DISTANCE",
  lastId: 0,
}