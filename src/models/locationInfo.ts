export interface KaKaoAddress {
  location: {
    road_address: {
      address_name?: string;
      region_1depth_name: string;
      region_2depth_name: string;
      region_3depth_name: string;
      road_name: string;
      underground_yn: string;
      main_building_no: string;
      sub_building_no: string;
      building_name: string;
      zone_no: string;
    },
    address: {
      address_name: string;
      region_1depth_name: string;
      region_2depth_name: string;
      region_3depth_name: string;
      mountain_yn: string;
      main_address_no: string;
      sub_address_no: string;
    }
  },
}
export const initialKaKaoAddress: KaKaoAddress = {
  location: {
    road_address: {
      address_name: "",
      region_1depth_name: "",
      region_2depth_name: "",
      region_3depth_name: "",
      road_name: "",
      underground_yn: "",
      main_building_no: "",
      sub_building_no: "",
      building_name: "",
      zone_no: ""
    },
    address: {
      address_name: "",
      region_1depth_name: "",
      region_2depth_name: "",
      region_3depth_name: "",
      mountain_yn: "",
      main_address_no: "",
      sub_address_no: "",
    }
  }
}

export interface PostLocation {
  alias: string;
  isMarked: boolean;
  address: {
    regionAddress?: string;
    roadAddress?: string;
    locationName: string;
    depth1: string;
    depth2: string;
    depth3: string;
    detail?: string;
    lng: number,
    lat: number
  }
}

export const initialPostLocation: PostLocation = {
  alias: '',
  isMarked: false,
  address: {
    regionAddress: '',
    roadAddress: '',
    locationName: '',
    depth1: '',
    depth2: '',
    depth3: '',
    detail: '',
    lng: 0,
    lat: 0
  }
}