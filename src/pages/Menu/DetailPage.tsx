import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Dimensions, Image, Linking, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { deletepickStore, getAccessToken, getStoreInfo, getStoreMenu1, pickStore } from "../../config/AxiosFunction";
import { initialStoreInfo, StoreInfo } from "../../models/storeInfo";
import DetailPopup from "./DetailPopUp";
import Icon from 'react-native-vector-icons/Ionicons';
import { initialStoreMenu1, StoreMenu1 } from "../../models/storemenu";
import BottomPopup from "../../components/Modal/BottomPopUp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { RoundedCheckbox } from "react-native-rounded-checkbox";

type DetailPageProps = {
  route: any;
  navigation?: any;
}

type StoreMenuOption = {
  id: number;
  smallItem?: string;
  description?: string;
  price: number;
  image?: string;
  isExausted?: boolean;
}

type StoreMenu = {
  id: number;
  bigCategory: string;
  bigItems: StoreMenu1[];
}

const initialStoreMenu = {
  id: 0,
  bigCategory: '',
  bigItems: []
}
const DetailPage = ({ navigation, route }: DetailPageProps) => {
  const [storeMenu, setStroeMenu] = useState<StoreMenu[]>([]);
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(initialStoreInfo);
  const [active, setActive] = useState<number>(0);
  // const [modalOpen, setModalOpen] = useState(false);
  const [ready, setReady] = useState<boolean>(true);
  const [contentLimit, setContentlimit] = useState<number>(80);
  const [descriptionLimit, setDescriptionlimit] = useState<number>(20);
  const [modalOpen, setModalOpen] = useState(false);
  const [params, setParams] = useState<StoreMenu>(initialStoreMenu);
  const deviceHeight = Dimensions.get("window").height;
  const { width } = Dimensions.get('window');
  const height = width * 0.6;
  const [id, setId] = useState<number>(0);
  const isFocused = useIsFocused();

  const [selectStore, setSelectStore] = useState<StoreInfo>(initialStoreInfo);
  const [selectId, setSelectId] = useState<number>(0);
  const [selectProfile, setSelectProfile] = useState<string>('');
  const [selectStoreMenu, setSelectStoreMenu] = useState<StoreMenu1>(initialStoreMenu1);
  const [selectTotalAmount, setSelectTotalAmount] = useState<number>(0);
  const [selectTotalPrice, setSelectTotalPrice] = useState<number>(0);

  const [radioButtons, setRadioButtons] = useState<StoreMenuOption[]>([]);

  const detailStoreInfo = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await getStoreInfo(accessToken, route.params?.detailId);
    console.log("가게정보!: ", response.data);
    setStoreInfo(response.data)
  }

  const openModal = () => {
    setModalOpen(true);
  }

  const goNaverMap = () => {
    console.log("네이버지도");

    openModal();
  }

  // const goCart = () => {
  //   navigation.navigate('CartList');
  // }

  const closeModal = () => {
    setModalOpen(false);
  }

  const getStoreMenu = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await getStoreMenu1(accessToken, route.params?.detailId);
    console.log("가게 대메뉴정보!:", response.data);
    setStroeMenu(response.data)
    setParams(response.data[0])

  }
  const handleOption = (storeId: number, menu: StoreMenu1) => {
    // console.log("가게ID", storeId);
    // console.log("메뉴ID", menu);
    navigation.navigate('DetailOptionPage', {
      storeId: storeId,
      menu: menu,
      storeInfo: storeInfo,
      profile: route.params?.profile
    })
  }

  const onPictureChange = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.ceil(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
    if (slide !== active) {
      setActive(slide);
    }
  }

  // const openModal = () => {
  //   setModalOpen(true);

  // }

  // const closeModal = () => {
  //   setModalOpen(false);
  // }


  useEffect(() => {

    console.log("postId", route.params?.detailId);
    if (route.params?.detailId) {
      setTimeout(() => {
        setId(route.params?.detailId);
        detailStoreInfo()
        getStoreMenu()
        setReady(false)
      }, 2000)

      // openModal()
    }
    // console.log(arr);

  }, [])

  useEffect(() => {
    console.log("called");
    console.log(isFocused);

    if (isFocused) {
      LoadCartList();
    }

  }, [isFocused])

  useEffect(() => {
    console.log(storeMenu.map(menu => menu.id));
    console.log(storeInfo.isPicked);

  }, [storeInfo.isPicked])

  const toggleEllipsis = (str: string, limit: number) => {
    return {
      string: str.slice(0, limit),
      isShowMore: str.length > limit
    }
  }
  const onClickMore = (str: string) => {
    setContentlimit(str.length);
  }

  const onMore = (str: string) => {
    setDescriptionlimit(str.length);
  }

  const LoadCartList = async () => {
    const storeInfo = await AsyncStorage.getItem('storeInfo');
    if (storeInfo) {
      console.log("Cart StoreInfo", storeInfo);
      setSelectStore(JSON.parse(storeInfo));
    }
    const storeId = await AsyncStorage.getItem('storeId');
    if (storeId) {
      setSelectId(JSON.parse(storeId));
    }
    const profile = await AsyncStorage.getItem('profile');
    if (profile) {
      setSelectProfile(JSON.parse(profile));
    }
    const menu = await AsyncStorage.getItem('menu');
    if (menu) {
      setSelectStoreMenu(JSON.parse(menu));
    }
    const smallItem = await AsyncStorage.getItem('smallItem');
    if (smallItem) {
      console.log("Cart SmallItem", smallItem);
      setRadioButtons(JSON.parse(smallItem));
    }
    const totalAmount = await AsyncStorage.getItem('totalAmount');
    if (totalAmount) {
      setSelectTotalAmount(JSON.parse(totalAmount));
    }
    const totalPrice = await AsyncStorage.getItem('totalPrice');
    if (totalPrice) {
      setSelectTotalPrice(JSON.parse(totalPrice));
    }
  }

  const handlePick = async () => {
    console.log("click");
    const accessToken = await getAccessToken('accessToken');
    if (storeInfo.isPicked === true) {
      const response = await deletepickStore(accessToken, id);
      console.log(response.data);
      if (response.data === true) {
        setStoreInfo({
          ...storeInfo,
          isPicked: false
        })
      }
    } else {
      const response = await pickStore(accessToken, id);
      console.log(response.data);
      if (response.data === true) {
        setStoreInfo({
          ...storeInfo,
          isPicked: true
        })
      }
    }

  }

  const setMenu = (e: string) => {
    console.log(e);
    setParams({
      ...params,
      bigCategory: e
    })
  }

  const goCart = () => {
    navigation.navigate('CartList', {
      storeInfo: selectStore,
      postId: selectId,
      profile: selectProfile,
      menu: selectStoreMenu,
      smallItem: radioButtons,
      amount: selectTotalAmount,
      price: selectTotalPrice
    })
  }
  return (
    <>
      {ready ?
        <View style={[DetailWrapper.container, DetailWrapper.horizontal]}>
          <ActivityIndicator size="large" />
        </View> :
        // <View>
        <View style={{ display: 'flex', flex: 4, backgroundColor: 'white' }}>
          <View style={{ flex: 0.85, backgroundColor: 'white' }}>
            <ScrollView
              style={DetailWrapper.MainContainer}
              stickyHeaderIndices={[4]}>
              <View style={{ flex: 0.5, height: height, position: 'relative' }}>
                <ScrollView
                  pagingEnabled
                  horizontal
                  onScroll={onPictureChange}
                  showsHorizontalScrollIndicator={false}
                  style={{ width: width, height: height }}>
                  {storeInfo.postImages?.map((post: string, index: number) => {
                    return (
                      <View key={index}>
                        <Image
                          source={{ uri: post ? post : 'null' }}
                          style={{
                            resizeMode: 'cover',
                            // borderRadius: 20,
                            width: width,
                            height: height,
                            // position: 'absolute'
                          }} />
                        <TouchableOpacity
                          style={{
                            position: 'absolute',
                            top: 10,
                            right: 10
                          }}
                          onPress={() => handlePick()}>
                          <Icon name="bookmark" size={20} color={
                            storeInfo.isPicked === true ? '#00C1DE' : 'white'} />
                        </TouchableOpacity>
                      </View>

                    )
                  })}
                </ScrollView>
                <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, alignSelf: 'center' }}>
                  {storeInfo.postImages.map((post: string, index: number) => {
                    return (
                      <Text
                        key={index}
                        style={index == active ? DetailWrapper.BannerPagingActive : DetailWrapper.BannerPaging}>⬤</Text>
                    )
                  })}
                </View>
              </View>

              <View style={{
                // justifyContent: 'center',
                // alignContent: 'center',
                // alignItems: 'center',
                padding: 10,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                borderTopWidth: 5,
                borderColor: 'rgba(0, 0, 0, 0.01)',
                shadowColor: '#52006A',
                elevation: 3,
              }}>

                <View style={{ flex: 1, paddingTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', paddingRight: 20 }}>{storeInfo.storeName}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="star" color={"#00C1DE"} size={20} />
                    <Text style={{ fontSize: 20, paddingRight: 20 }}>{storeInfo.storeStar}</Text>
                  </View>
                  <Text style={{ fontSize: 15, paddingRight: 20 }}>누적 포장수 {storeInfo.orderCount}+</Text>
                </View>
                <View style={{ flex: 1, paddingTop: 10, }}>
                  <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{storeInfo.postTitle}</Text>
                </View>
                <View style={{ flex: 1, paddingTop: 15 }}>
                  <Text>평균 조리시간 {storeInfo.cookTimeAvg}분</Text>
                </View>
                <View style={{
                  flex: 1,
                  paddingTop: 15,
                  paddingBottom: 15,
                  flexDirection: 'row',
                }}>
                  <Text style={{ paddingRight: 160 }}>{storeInfo.storeAddress}</Text>
                  <TouchableOpacity onPress={() => Linking.openURL(`tel:${storeInfo.storePhone}`)}>
                    <Icon name="call" color={'#000'} size={20} style={{ paddingLeft: 20 }} />
                  </TouchableOpacity>
                </View>
                <View style={{
                  borderStyle: 'solid',
                  borderBottomWidth: 1,
                  borderColor: 'lightgray',
                  width: '95%',
                }}></View>
                <View style={{
                  flex: 0.3,
                  paddingTop: 15,
                  paddingBottom: 15,
                  borderStyle: 'solid',
                  // borderBottomWidth: 1,
                  borderColor: 'lightgray',
                }}>
                  {/* <Text style={{ color: 'black' }}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >{storeInfo.postContent}</Text> */}
                  <Text style={{ color: 'black', margin: 'auto' }}>
                    {toggleEllipsis(storeInfo.postContent, contentLimit).string}

                    <View style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                      <TouchableOpacity
                        onPress={() => onClickMore(storeInfo.postContent)}>
                        {toggleEllipsis(storeInfo.postContent, contentLimit).isShowMore
                          &&
                          <Text style={{ margin: -10 }}>... 더보기</Text>
                        }
                      </TouchableOpacity>
                    </View>


                  </Text>

                </View>

                <View style={DetailWrapper.Horizon}></View>

                <View style={DetailWrapper.MenuHeaderWrapper}>
                  <Text style={DetailWrapper.MenuHeader}>메뉴 🍽</Text>
                  <ScrollView
                    pagingEnabled
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  >
                    {storeMenu?.map((menu1: StoreMenu, index: number) =>
                      <TouchableOpacity
                        key={index}
                        style={{
                          minWidth: 70,
                          borderWidth: 1,
                          // width: 80,
                          height: 30,
                          backgroundColor: params.bigCategory === menu1.bigCategory ? '#00C1DE' : '#E8E8E8',
                          // backgroundColor: 'rgba(27, 147, 234, 0.93)',
                          borderRadius: 50,
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: 3
                        }}
                        onPress={() => setMenu(menu1.bigCategory)}
                      >
                        <View style={{ alignSelf: 'center', padding: 5 }}>
                          <Text style={{
                            color: "#000",
                            fontWeight: "bold",
                            fontSize: 15,
                            paddingLeft: 5,
                            paddingRight: 5
                          }}>{menu1.bigCategory}</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </ScrollView>
                </View>
                <View style={DetailWrapper.MenuWrapper}>
                  <ScrollView>
                    {storeMenu?.map((menu1: StoreMenu, index: number) => {
                      return (

                        <View key={index}>
                          <Text style={{ padding: 10, fontSize: 17, fontWeight: 'bold', color: 'black' }}>
                            {menu1.bigCategory}
                          </Text>
                          {menu1.bigItems.map((item: StoreMenu1, index: number) => {
                            return (
                              <TouchableOpacity key={index}
                                onPress={() => handleOption(menu1.id, item)}
                                style={{
                                  flexDirection: 'row',
                                  borderWidth: 2,
                                  borderRadius: 20,
                                  // borderBottomColor: 'rgba(0, 0, 0, 0.12)',
                                  marginBottom: 10,
                                  paddingLeft: 10,
                                  paddingTop: 10,
                                  width: 360,
                                  height: 150,
                                  borderColor: 'rgba(0, 0, 0, 0.05)',
                                  shadowColor: '#52006A',
                                  backgroundColor: 'white',
                                  elevation: 5,
                                  justifyContent: 'space-evenly'
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'column',
                                    justifyContent: 'space-evenly'
                                  }}>
                                  <Text style={{
                                    fontSize: 15,
                                    color: 'black',
                                    fontWeight: 'bold',
                                    // marginBottom: 10,
                                  }}>{item.bigItem}</Text>
                                  <Text style={{
                                    maxWidth: 230,
                                    fontSize: 12,
                                    color: '#959595',
                                    fontWeight: 'bold',
                                    // marginBottom: 10,
                                  }}>{toggleEllipsis(item.description, descriptionLimit).string}
                                    <View style={{
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}>
                                      <TouchableOpacity
                                        onPress={() => onMore(item.description)}>
                                        {toggleEllipsis(item.description, descriptionLimit).isShowMore
                                          &&
                                          <Text style={{ margin: -10 }}>... 더보기</Text>
                                        }
                                      </TouchableOpacity>
                                    </View>
                                  </Text>
                                  <Text style={{
                                    color: 'black',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                  }}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
                                </View>
                                <View style={{
                                  paddingTop: 10,
                                  paddingLeft: 10,
                                }}>
                                  <Image
                                    source={{ uri: item.image }}
                                    style={{
                                      borderRadius: 20,
                                      width: 100,
                                      height: 100
                                    }}
                                  />
                                </View>

                              </TouchableOpacity>
                            )
                          })}
                        </View>
                      )
                    })}
                  </ScrollView>
                </View>
              </View>
            </ScrollView>

            <View style={{
              flex: 0.5,
              borderStyle: 'solid',
              borderBottomWidth: 1,
              borderColor: 'lightgray',
              width: '100%',
            }}></View>

          </View>

          <View style={DetailWrapper.footer}>
            <TouchableOpacity style={DetailWrapper.NaverView} onPress={goNaverMap}>
              <Text style={DetailWrapper.ButtonMapText}>길찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={DetailWrapper.CartView}
              onPress={goCart}>
              <Text style={DetailWrapper.ButtonText}>
                카트 보기
              </Text>
              {radioButtons.length > 0 ?
                <View style={{
                  justifyContent: 'center',
                  position: 'relative',
                  alignItems: 'center',
                  alignContent: 'center',
                }}>
                  <Icon name="ellipse"
                    size={25}
                    color={'white'}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignContent: 'center',
                    }} />
                  <Text style={{
                    color: '#00C1DE',
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    textAlign: 'center',
                    position: 'absolute'
                  }}>
                    {radioButtons.length}
                  </Text>

                </View> :
                null
              }

            </TouchableOpacity>
          </View>


        </View >

      }
      {/* <BottomPopup
        open={modalOpen}
        close={closeModal}
        kind="map"
        onTouchOutSide={closeModal}
      /> */}
    </>
  )
  {/* <DetailPopup
        open={modalOpen}
        close={closeModal}
        postId={route.params?.detailId}
        onTouchOutSide={closeModal}
      /> */}
}
const DetailWrapper = StyleSheet.create({
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
    backgroundColor: 'white',
    // alignContent: 'center',
    // justifyContent: 'center',
    // padding: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
  },
  BannerPaging: {
    color: '#888',
    margin: 3
  },
  BannerPagingActive: {
    color: '#00C1DE',
    margin: 3,
  },
  Horizon: {
    width: '100%',
    textAlign: 'center',
    borderBottomColor: 'green',
    // borderBottomWidth: 1,
    lineHeight: 1,
    margin: 10
  },
  MenuHeaderWrapper: {
    width: 350,
    padding: 5,
    // flex: 4,
    flexDirection: "row",
    // justifyContent: 'space-between'
  },
  MenuHeader: {
    color: 'black',
    fontSize: 25,
    fontWeight: '800',
    paddingRight: 20
  },
  MenuWrapper: {
    flex: 1,
    backgroundColor: 'white',
    // alignContent: 'center',
    // padding: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
  },
  footer: {
    position: 'absolute',
    backgroundColor: 'white',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopWidth: 5,
    borderColor: 'rgba(0, 0, 0, 0.01)',
    shadowColor: '#52006A',
    elevation: 3,
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  NaverView: {
    padding: 10,
    width: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00C1DE',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    marginRight: 50
  },
  ButtonMapText: {
    color: '#00C1DE',
    fontWeight: 'bold',
    fontSize: 20,
  },
  CartView: {
    padding: 10,
    width: 200,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#00C1DE',
    flexDirection: 'row'
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    paddingRight: 10
  },
})
export default DetailPage;