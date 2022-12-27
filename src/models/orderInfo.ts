export interface OrderInfo {
    id: number,
    orderAt: string,
    storeProfile: string,
    storeName: string,
    simpleMenu: string,
    finalPrice: number,
    pickUpAt: string
    acceptAt: string,
    doneAt: string,
    status: string
}

// export const intialOrderInfo: OrderInfo = {
//     id: 0,
//     orderAt: '',
//     storeProfile: '',
//     storeName: '',
//     simpleMenu: '',
//     finalPrice: 0,
//     pickUpAt: '',
//     acceptAt: '',
//     doneAt: '',
//     status: ''
// }

export interface DistanceInfo {
    distance: number
}

export const initialDistanceInfo: DistanceInfo = {
    distance: 0,
}

export interface OrderSmpInfo {
    id: number,
    simpleMenu: string,
    finalPrice: number,
    requirements: string,
    status: string,
    pickUpAt: string
}

export const initialOrderSmpInfo: OrderSmpInfo = {
    id: 0,
    simpleMenu: '',
    finalPrice: 0,
    requirements: '',
    status: '',
    pickUpAt: ''
}