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
  cookTimeAvg: number;
  storeName: string;
  storeProfile: string;
  storeStar: string;
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
  // const menuList = ['전체', '한식', '중식', '일식', '분식'];
  const [menuList, setmenuList] = useState<string[]>([]);
  const [bannerList, setBannerList] = useState<Banner[]>([]);
  const [storeList, setStoreList] = useState<Store[]>([]);
  const [active, setActive] = useState<number>(0);
  const [params, setParams] = useState<StoreParams>(intialStorePrams);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [detaiId, setDetailId] = useState<number>(0);

  // const [filterType, setFiterType] = useState<string>('거리순');
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
    console.log("가게정보", response.data.content);
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
        keyword: route.params?.menu
      })
    }
    console.log("음식종류: ", menuList);
    console.log("선택한 음식 종류: ", params.foodType);
    console.log("검색 params", params);
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

  // const openModal = (id: number) => {
  //   setModalOpen(true);
  //   setDetailId(id);
  // }

  // const closeModal = () => {
  //   setModalOpen(false);
  // }

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
          {/* <View style={MainWrapper.BannerWrapper}> */}
          {/* <Carousel
            data={bannerList}
            sliderWidth={200}
            itemWidth={200}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => { Alert.alert("배너 클릭") }}>
                  <Image source={{ uri: item.image }} />
                </TouchableOpacity>
              )
            }
            }
          /> */}
          <View style={{ width: width * 0.9, height: height * 0.8, }}>
            <ScrollView
              pagingEnabled
              horizontal
              onScroll={onPictureChange}
              showsHorizontalScrollIndicator={false}
              style={{ width: width * 0.9, height, }}>
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
            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, alignSelf: 'center' }}>
              {bannerList.map((banner: Banner, index: number) => {
                return (
                  <Text
                    key={index}
                    style={index == active ? MainWrapper.BannerPagingActive : MainWrapper.BannerPaging}>⬤</Text>
                )
              })}
            </View>
          </View>


          {/* <Image source={require('../assets/banner.png')} ></Image> */}
          {/* </View> */}
          <View style={MainWrapper.Horizon}></View>
          <View style={{ width: width * 0.9, height: height * 0.2 }}>
            <ScrollView
              pagingEnabled
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ width: width, height: height * 0.2 }}>
              {menuList?.map((menu: string, index: number) =>
                <TouchableOpacity
                  key={index}
                  style={{
                    // display: 'flex',
                    // maxWidth: 120,
                    minWidth: 70,
                    // width: 80,
                    height: 30,
                    backgroundColor: params.foodType === menu ? 'linear-gradient(180deg, #00C1DE 0%, rgba(27, 147, 234, 0.93) 100%);' : '#E8E8E8',
                    // backgroundColor: 'rgba(27, 147, 234, 0.93)',
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 3
                  }}
                  onPress={e => setMenu(menu)}
                >
                  <View style={{ alignSelf: 'center', padding: 5 }}>
                    <Text style={MainWrapper.menutext}>{menu}</Text>
                  </View>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
          <View style={MainWrapper.ListHeaderWrapper}>
            <Text style={MainWrapper.header}>우리동네 포장맛집 🍽</Text>
            {/* <DropDownPicker
            multiple={false}
            items={filterList}
            value={filterType}
            setValue={setFiterType}
            open={open}
            setOpen={setOpen}
            setItems={setFilterList}
            containerStyle={{ width: 100, height: 40 }}
            // badgeStyle={{ width: 10 }}
            // labelStyle={{ width: 10 }}
            // disabledStyle={{ width: 10 }}
            // listItemContainerStyle={{ width: 40 }}
            style={{ width: 100, height: 40 }}
            // arrowIconContainerStyle={{ width: 10, height: 10 }}
            // arrowIconStyle={{ width: 10, height: 10 }}
            onChangeValue={() => handleChangeFilter}
          /> */}

            <View style={{ flexDirection: 'row', }}>
              <Picker
                mode="dropdown"
                selectedValue={params.sort}
                onValueChange={(item) => handleChangeFilter(item)}
                style={{
                  width: 130,
                  height: 10,
                  margin: -10
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
          <View style={MainWrapper.ListWrapper}>
            <ScrollView>
              {storeList?.map((store: Store, index: number) => {
                return (
                  <TouchableOpacity key={index}
                    onPress={() => goDetail(store.id, store.storeProfile)}
                    // onPress={() => openModal(store.postId)}
                    style={{
                      flexDirection: 'row',
                      borderWidth: 2,
                      borderRadius: 20,
                      // borderBottomColor: 'rgba(0, 0, 0, 0.12)',
                      marginBottom: 10,
                      width: 360,
                      height: 160,
                      borderColor: 'rgba(0, 0, 0, 0.05)',
                      paddingLeft: 10,
                      paddingTop: 15,
                      shadowColor: '#52006A',
                      backgroundColor: 'white',
                      elevation: 5,
                    }}>
                    <Image
                      source={{ uri: store.storeProfile }}
                      style={{
                        borderRadius: 20,
                        width: 120, height: 120
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'column',
                        paddingLeft: 15,
                      }}>
                      <Text style={{
                        width: 190,
                        fontSize: 15,
                        fontWeight: 'bold',
                        marginBottom: 10,
                        color: 'black'
                      }}>{store.postTitle}</Text>
                      <Text style={{
                        color: 'black',
                        marginBottom: 10,
                      }}>평균 조리시간 {store.cookTimeAvg}분</Text>
                      <Text style={{
                        fontWeight: '400',
                        marginBottom: 10,
                      }}>{store.town} {store.distance}m</Text>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={{ marginRight: 10, color: 'black' }}>{store.storeName}</Text>
                          <View style={{ flexDirection: 'row' }}>
                            <Icon style={{ justifyContent: 'center', alignItems: 'center' }} name="star" color={"#00C1DE"} size={18} />
                            <Text style={{ fontSize: 15, }}>{store.storeStar}</Text>
                          </View>
                        </View>
                        {/* <Icon name="bookmark-outline" size={18} /> */}
                      </View>

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
    color: 'white',
    margin: 3
  },
  Horizon: {
    width: '100%',
    textAlign: 'center',
    borderBottomColor: 'green',
    // borderBottomWidth: 1,
    lineHeight: 1,
    margin: 10
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
    color: "#000",
    fontWeight: "bold",
    fontSize: 15,
    paddingLeft: 5,
    paddingRight: 5
  },
  ListHeaderWrapper: {
    width: 350,
    paddingTop: 10,
    flex: 4,
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
    paddingTop: 10,
    flex: 4,
  }
})
export default MainPage;