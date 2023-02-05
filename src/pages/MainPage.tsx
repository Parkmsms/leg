import React, { useState, useEffect, useRef } from "react";
import { Alert, Dimensions, Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View, VirtualizedList, ActivityIndicator, SafeAreaView } from "react-native";
import { activeLocation, getAccessToken, getStoreList, getBannerList, getFoodKindsList } from "../config/AxiosFunction";
import Icon from 'react-native-vector-icons/Ionicons';
import { intialStorePrams, StoreParams } from "../models/listfilterInfo";
// import DropDownPicker from 'react-native-dropdown-picker';
// import { SafeAreaView } from "react-native-safe-area-context";
// import SliderBox from 'react-native-image-slider-box';
// import Carousel from 'react-native-snap-carousel';
import { Picker } from '@react-native-picker/picker';
import DetailPopup from "./Menu/DetailPopUp";
import LinearGradient from 'react-native-linear-gradient';



const { width } = Dimensions.get('window');
const height = width * 0.6;

type MyLocation = {
  locationId: number;
  userId: number;
  alias: string;
  isActive: boolean;
  address: {
    regionAddress: string;
    roadAddress: string;
    locationName: string;
    depth1: string;
    depth2: string;
    depth3: string;
    detail: string;
    lng: number;
    lat: number;
  }
};

type Store = {
  id: number;
  postTitle: string;
  minCookTime: number;
  storeName: string;
  storeProfile: string;
  star: number;
  town: string;
  distance: number;
  foodTypes: string[];
}
type MainPageProps = {
  route: any;
  navigation?: any;
}

type Banner = {
  info: {
    type: 'EVENT' | 'NOTICE';
    id: number;
  },
  title: string;
  image: string;
}

const MainPage = ({ navigation, route }: MainPageProps) => {
  const [myLocation, setMyLocation] = useState<MyLocation>();
  const [menuList, setmenuList] = useState<string[]>([]);
  const [bannerList, setBannerList] = useState<Banner[]>([]);
  const [storeList, setStoreList] = useState<Store[]>([]);
  const [active, setActive] = useState<number>(0);
  const [params, setParams] = useState<StoreParams>(intialStorePrams);
  const [ready, setReady] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [filterList, setFilterList] = useState([
    { label: '거리순', value: '거리' },
    { label: '정렬순', value: '정렬' },
    { label: '별점순', value: '별점' }
  ])
  const getLocation = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await activeLocation(accessToken);
    setMyLocation(response.data);
  }

  const getBanner = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await getBannerList(accessToken);
    console.log("베너", response.data);
    setBannerList(response.data)
  }

  const getList = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await getStoreList(accessToken, params);
    console.log("storeList", response.data)
    setStoreList(response.data.content)
  }

  const getFoodsList = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await getFoodKindsList(accessToken);
    setmenuList(response.data);
  }

  useEffect(() => {
    console.log("메인페이지 검색어", route.params?.menu);
    if (route.params?.menu) {
      setParams({
        ...params,
        search: route.params?.menu
      })
    }

    setTimeout(() => {
      getLocation()
      getBanner()
      getList()
      getFoodsList()
      setReady(false)
    }, 2000)

  }, [params, route.params?.menu])

  const goDetail = (id: number, profile: string) => {
    console.log(id);
    console.log(profile);
    navigation.navigate('DetailPage', { detailId: id, profile: profile })
  }

  const setMenu = (e: string) => {
    console.log(e);
    setParams({
      ...params,
      foodType: e
    })
  }

  const goLocationSetting = () => {
    navigation.navigate('LocationSetting')
  }

  const goMenuSearch = () => {
    navigation.navigate('MenuSearch')
  }

  const onPictureChange = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.ceil(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
    if (slide !== active) {
      setActive(slide);
    }

  }
  const handleChangeFilter = (item: string) => {
    console.log(item);
    setParams({
      ...params,
      sort: item
    })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {ready ?
        <View style={[MainWrapper.container, MainWrapper.horizontal]}>
          <ActivityIndicator size="large" />
        </View>
        :
        <ScrollView style={MainWrapper.MainContainer}>
          <View style={MainWrapper.HeadeWrapper}>
            <View style={{ flexDirection: 'row', }} >
              <Text onPress={goLocationSetting}
                style={MainWrapper.location} >{myLocation?.address.roadAddress}</Text>
              <Icon name='caret-down-outline' size={22} color="black" style={{ paddingRight: 80, alignContent: 'flex-start' }} />
            </View>
            <View style={{ flexDirection: 'row', right: 10 }}>
              <Icon name='search-outline' size={25} color="black" onPress={goMenuSearch} />
              <Icon name='notifications-outline' size={25} color="black" />
            </View>
          </View>

          {/* 배너 */}
          <View style={{alignItems:"center"}}>
          <View style={{ width: width * 0.9, }}>
            <ScrollView
              pagingEnabled
              horizontal
              onScroll={onPictureChange}
              showsHorizontalScrollIndicator={false}
              style={{ width: width * 0.9 }}>
              {bannerList.map((banner: Banner, index: number) => {
                return (
                  <Image
                    key={index}
                    source={{ uri: banner.image }}
                    style={{
                      resizeMode: 'contain',
                      borderRadius: 20,
                      width: width * 0.9,
                      height: height * 0.8,
                    }} />
                )
              })}
            </ScrollView>
          </View>
          <View style={{ justifyContent: 'center', height: height * 0.1, flexDirection: 'row', alignSelf: 'center' }}>
            {bannerList.map((banner: Banner, index: number) => {
              return (
                <Text
                  key={index}
                  style={index == active ? MainWrapper.BannerPagingActive : MainWrapper.BannerPaging}>⬤</Text>
              )
            })}
          </View>
          </View>

          {/* 카테고리 */}
          <View style={{ width: width * 0.9, height: height * 0.2 }}>
            <ScrollView
              pagingEnabled
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ width: width, height: height * 0.2 }}>
              {menuList?.map((menu: string, index: number) =>
                  <TouchableOpacity
                  key={index}
                  onPress={e => setMenu(menu)}
                  >
                  <LinearGradient colors= { params.foodType === menu? ['#AFD1E7',
                  '#03BDDF',
                  '#0AB1E2',
                  '#0FA7E5',
                  '#10A6E5',
                  '#159EE7',
                  '#1898E9',
                  '#1996E9',
                  '#1996E9',
                  '#1997E9',
                  '#1898E8',
                  '#1898E8',
                  '#1998E9',
                  '#1997E9',
                  '#1997E9',
                  '#1997E9',
                  '#1A96E9',
                  '#1A96E9',
                  '#1A95E9',
                  '#1A88D8'
                  ]:
                  ['#E8E8E8','#E8E8E8','#E8E8E8']
                } style={{ borderRadius: 30,
                      justifyContent: "center",alignItems: "center", marginRight: 5, minWidth: 70,  height: 30,}}>
                    <View style={{ alignSelf: 'center', padding: 5 }}>
                    <Text style={params.foodType === menu? MainWrapper.menutext : MainWrapper.menutext2}>{menu}</Text>
                  </View>
                  </LinearGradient>
                  </TouchableOpacity>
              )}
            </ScrollView>
          </View>

          {/* 메뉴헤더_박문수 */}
          <View style={MainWrapper.ListHeaderWrapper}>
            <Text style={MainWrapper.header}>우리동네 포장맛집 🍽</Text>
            <View style={{ display: 'flex', flexDirection: 'row', width: 100 }}>
              <Picker
                selectedValue={params.sort}
                onValueChange={(item) => handleChangeFilter(item)}
                style={{
                  width: 130,
                  margin: -10,
                  color:'#888888'
                }}
              >
                <Picker.Item label="거리순" value={"거리순"} />
                <Picker.Item label="별점순" value={"별점순"} />
                <Picker.Item label="주문순" value={"주문순"} />
              </Picker>
              {/* <Icon name="git-compare-outline" size={20} /> */}
            </View>
            {/* <Image source={require('../assets/filter.png')}></Image> */}
          </View>

          {/* 메뉴 */}
          <View style={MainWrapper.ListWrapper}>
            <ScrollView>
              {storeList?.map((store: Store, index: number) => {
                return (
                  <TouchableOpacity key={index}
                    onPress={() => goDetail(store.id, store.storeProfile)}
                    // onPress={() => openModal(store.postId)}
                    style={MainWrapper.itemBox}>
                    <Image
                      source={{ uri: store.storeProfile }}
                      style={{
                        borderRadius: 20,
                        width: 100, height: 100,
                        justifyContent: "center"
                      }}
                      resizeMode="stretch"
                    />
                    {/* 여기부터 텍스트 */}
                    <View
                      style={{
                        flexDirection: 'column',
                        paddingLeft: 10,
                        marginLeft: 10
                      }}>
                      <View style={{ flex: 1 }}>
                        <Text style={[MainWrapper.basicFont, {
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: '#000000',
                          width: width * 0.5,
                          marginBottom: 5

                        }]}
                          numberOfLines={2}
                          ellipsizeMode="tail"
                        >
                          {store.postTitle}
                        </Text>
                        <Text style={[MainWrapper.basicFont, {
                          fontSize: 12,
                          fontWeight: '500',
                          color: '#000000',
                          marginBottom: 5
                        }]}>평균 조리시간 {store.minCookTime}분
                        </Text>
                        <Text style={[MainWrapper.basicFont, {
                          fontSize: 12,
                          fontWeight: '500',
                          color: '#7A7A7A',
                          marginBottom: 5
                        }]}>{store.town} {store.distance}m
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={[MainWrapper.basicFont, {
                          fontSize: 10,
                          fontWeight: '500',
                          color: '#000000',
                          marginRight: 6,
                        }]}>
                          {store.storeName}
                        </Text>
                        <View style={{ flexDirection: 'row', }}>
                          <Icon style={{ justifyContent: 'center', alignItems: 'center' }} name="star" color={"#00C1DE"} size={12} />
                          <Text style={{ fontSize: 10, }}>{store.star}</Text>
                        </View>
                      </View>
                      {/* <Icon name="bookmark-outline" size={18} /> */}
                    </View>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </View >
        </ScrollView>

      }
    </SafeAreaView>


  )
}
const MainWrapper = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'background-color: rgba(0, 0, 0, 0.01)'
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
    // alignContent: 'center',
    // padding: 10,
    paddingLeft: 10,
    paddingRight: 10
    // paddingRight: 10,
  },
  HeadeWrapper: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    flex: 2,
    flexDirection: "row",
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    // borderLeftWidth: 3,
    // borderRightWidth: 3,
    // borderBottomColor: 'rgba(0, 0, 0, 0.5)',
    // borderColor: 'rgba(0, 0, 0, 0.5)',
    // shadowColor: '#52006A',
    backgroundColor: 'white',
  },
  location: {
    fontSize: 15,
    color: 'black'
  },
  BannerWrapper: {
    paddingTop: 30,
    paddingRight: 20
  },
  BannerPaging: {
    color: '#888',
    margin: 3
  },
  BannerPagingActive: {
    color: '#00C1DE',
    margin: 3
  },
  Horizon: {
    width: '100%',
    textAlign: 'center',
    borderBottomColor: 'green',
    // borderBottomWidth: 1,
    lineHeight: 1,
  },
  TagWrapper: {
    paddingTop: 10,
    // flex: 1,
    flexDirection: "row",
  },
  menutag: {
    width: 70,
    height: 30,
    backgroundColor: '#E8E8E8',
    // backgroundColor: 'rgba(27, 147, 234, 0.93)',
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 3
  },
  menutext: {
    color: "white",
    fontWeight: "700",
    fontFamily:'Apple SD Gothic Neo',
    fontStyle:'normal',
    fontSize: 12.5,
    letterSpacing:1.0,
    paddingLeft: 5,
    paddingRight: 5
  },
  menutext2: {
    color: "#7D7D7D",
    fontWeight: "700",
    fontFamily:'Apple SD Gothic Neo',
    fontStyle:'normal',
    fontSize: 12.5,
    letterSpacing:1.0,
    paddingLeft: 5,
    paddingRight: 5
  },
  ListHeaderWrapper: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  header: {
    color: 'black',
    fontSize: 25,
    fontWeight: '800',
  },
  filter: {
    color: 'black',
  },
  ListWrapper: {
    paddingTop: 30,
  },
  itemBox: {
    flexDirection: 'row',
    borderRadius: 20,
    height: 140,
    padding: 20,
    shadowColor: 'grey',
    borderTopWidth:0.05,
    borderBottomWidth:0.05,
    marginBottom:5,
    backgroundColor: 'white',
    elevation: 6,
  },
  basicFont: {
    fontFamily: 'Apple SD Gothic Neo',
    fontStyle: 'normal',
    letterSpacing: 0.1,
  }
})
export default MainPage;