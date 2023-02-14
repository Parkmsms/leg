import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, DeviceEventEmitter, Dimensions, Image, Linking, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { deletepickStore, getAccessToken, getStoreInfo, getStoreMenu1, pickStore, topImage3 } from "../../config/AxiosFunction";
import { initialStoreInfo, StoreInfo } from "../../models/storeInfo";
import DetailPopup from "./DetailPopUp";
import Icon from 'react-native-vector-icons/Ionicons';
import { initialStoreMenu1, StoreMenu1 } from "../../models/storemenu";
import BottomPopup from "../../components/Modal/BottomPopUp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { RoundedCheckbox } from "react-native-rounded-checkbox";
import { Fontisto } from "@expo/vector-icons";
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItemList
} from '../../slices/item';
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
  const dispatch = useDispatch();
  const cartItemList = useSelector(selectCartItemList);
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
  const [bigCategory, setBigCategory] = useState<string[]>([])
  const [line, setLine] = useState(2);
  const [isActivated, setIsActivated] = useState(false);

  //박문수 test
  const [top3Image, setTop3Image] = useState<[]>([]);

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

  const handleLine = () => {
    isActivated ? setLine(2) : setLine(Number.MAX_SAFE_INTEGER);
    setIsActivated(prev => !prev);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const getStoreMenu = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await getStoreMenu1(accessToken, route.params?.detailId);
    console.log("가게 대메뉴정보!:", response.data);
    setStroeMenu(response.data)
    setBigCategory(response.data.map((ele: { bigCategory: any; }) => ele.bigCategory));
    setParams(response.data[0])
  }

  //상품옵션설정 이동
  const handleOption = (menu: StoreMenu1) => {
    navigation.navigate('DetailOptionPage', {
      storeId: route.params?.detailId,
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

  useEffect(() => {

    console.log("postId", route.params?.detailId);
    if (route.params?.detailId) {
      setTimeout(() => {
        setId(route.params?.detailId);
        detailStoreInfo()
        getStoreMenu()
        //박문수 test <<
        // getImage3();
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
  //박문수 test
  const getImage3 = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await topImage3(accessToken, route.params?.detailId)
    setTop3Image(response.data);
  }

  const onReviewPage = (str: string) => {
    navigation.navigate('ReviewItem', { selectedImage: str })
  }

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
    console.log("cartItemList", cartItemList)
    setRadioButtons(cartItemList);
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
        <View style={{ display: 'flex', flex: 4, backgroundColor: '#EFEFEF' }}>
          <View style={{ flex: 0.85, backgroundColor: '#EFEFEF' }}>
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
                  {storeInfo.storeImages?.map((post: string, index: number) => {
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

                      </View>

                    )
                  })}
                </ScrollView>
                <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, alignSelf: 'center' }}>
                  {storeInfo.storeImages?.map((post: string, index: number) => {
                    return (
                      <Text
                        key={index}
                        style={index == active ? DetailWrapper.BannerPagingActive : DetailWrapper.BannerPaging}>⬤</Text>
                    )
                  })}
                </View>
              </View>

              {/* itemBox시작  */}
              <View style={{
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                borderColor: 'rgba(0, 0, 0, 0.01)',
              }}>
                <View style={{
                  padding: 18,
                }}>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 9 }}></View>
                    <TouchableOpacity
                      onPress={() => handlePick()}>
                      <Icon name="bookmark" size={20} color={
                        storeInfo.isPicked === true ? '#00C1DE' : 'grey'} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1, paddingTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', paddingRight: 7 }}>{storeInfo.storeName}</Text>
                      <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                        <Icon name="star" color={"#00C1DE"} size={18} />
                        <Text style={{ fontSize: 14, }}>{storeInfo.storeStar}</Text>
                      </View>
                    </View>
                    <Text style={{ fontSize: 10, }}>누적 포장수 {storeInfo.orderCount}+</Text>
                  </View>
                  <View style={{ flex: 1, paddingTop: 10, }}>
                    <Text style={{
                      color: 'black', fontSize: 20, fontWeight: 'bold', fontFamily: 'Apple SD Gothic Neo',
                      fontStyle: 'normal'
                    }}>{storeInfo.postTitle}</Text>
                  </View>
                  <View style={{ flex: 1, paddingTop: 15 }}>
                    <Text style={DetailWrapper.commonText}>평균 조리시간 {storeInfo.cookTimeAvg}분</Text>
                  </View>
                  <View style={{
                    flex: 1,
                    paddingTop: 8,
                    flexDirection: 'row',
                  }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                      <Text style={[DetailWrapper.commonText, { flex: 1 }]}>{storeInfo.storeAddress}</Text>
                      <TouchableOpacity onPress={() => Linking.openURL(`tel:${storeInfo.storePhone}`)}>
                        <Icon name="call" color={'#000'} size={15} style={{ flex: 1, marginRight: 10 }} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{
                    borderStyle: 'solid',
                    marginTop: 10,
                    borderBottomWidth: 1,
                    borderColor: 'lightgray',

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
                            <Text style={DetailWrapper.commonText}>... 더보기</Text>
                          }
                        </TouchableOpacity>
                      </View>
                    </Text>
                  </View>

                  {/* 박문수test */}
                  <View style={{
                    borderStyle: 'solid',
                    borderBottomWidth: 1,
                    borderColor: 'lightgray',
                  }}></View>
                  <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', marginTop: 15 }}>
                    {top3Image?.map((image: string, index: number) => {
                      return (
                        <TouchableOpacity onPress={() =>
                          onReviewPage(image)
                        }>
                          <View key={index}>
                            <Image
                              source={{ uri: image ? image : 'null' }}
                              style={{
                                justifyContent: "center",
                                alignItems: 'center',
                                width: 120, height: 70,
                                margin: 3,
                                borderRadius: 5
                              }} />
                          </View>
                        </TouchableOpacity>
                      )
                    })}
                  </View>
                </View>
                {/* 카테고리 필터링 */}
                <SelectDropdown
                  data={bigCategory}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                  }}
                  defaultButtonText={'카테고리'}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  buttonStyle={DetailWrapper.dropdown1BtnStyle}
                  buttonTextStyle={DetailWrapper.dropdown1BtnTxtStyle}
                  renderDropdownIcon={isOpened => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={DetailWrapper.dropdown1DropdownStyle}
                  rowStyle={DetailWrapper.dropdown1RowStyle}
                  rowTextStyle={DetailWrapper.dropdown1RowTxtStyle}
                />
                {/* 메뉴시작 */}
                <View style={DetailWrapper.MenuHeaderWrapper}>
                  <Text style={DetailWrapper.MenuHeader}>메뉴 🍽</Text>
                  {/* 숨김처리 */}
                  {/* <ScrollView
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
                  </ScrollView> */}
                </View>
                <View style={DetailWrapper.MenuWrapper}>
                  <ScrollView>
                    {storeMenu?.map((menu1: StoreMenu, index: number) => {
                      return (
                        <View key={index}>
                          <Text style={{ padding: 10, fontSize: 17, fontWeight: 'bold', color: 'black' }}>
                            {menu1.bigCategory}
                          </Text>
                          {/* 여기부터 음식메뉴 */}
                          {menu1.bigItems.map((item: StoreMenu1, index: number) => {
                            return (
                              <TouchableOpacity key={index}
                                onPress={() => handleOption(item)}
                                style={DetailWrapper.itemBox}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                  <View
                                    style={{
                                      flex: 2.3,
                                      flexDirection: 'column',
                                      justifyContent: 'space-evenly'
                                    }}>
                                    <Text style={{
                                      fontSize: 15,
                                      color: 'black',
                                      fontWeight: 'bold',
                                    }}
                                    >{item.bigItem}</Text>
                                    <Text style={[DetailWrapper.commonText, { marginTop: 10, marginBottom: 10 }]}
                                      numberOfLines={line}
                                      ellipsizeMode="tail"
                                      onPress={handleLine}
                                    >
                                      {item.description}

                                      {/* {toggleEllipsis(item.description, descriptionLimit).string}
                                    <View style={{
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}>
                                      <TouchableOpacity
                                        onPress={() => onMore(item.description)}>
                                        {toggleEllipsis(item.description, descriptionLimit).isShowMore
                                          &&
                                          <Text style={DetailWrapper.commonText}>... 더보기</Text>
                                        }
                                      </TouchableOpacity> 
                                    </View>  */}

                                    </Text>

                                    <Text style={{
                                      color: 'black',
                                      fontSize: 20,
                                      fontWeight: 'bold',
                                    }}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
                                  </View>
                                  <View style={{
                                    flex: 1,
                                    paddingLeft: 10,
                                  }}>
                                    <Image
                                      source={{ uri: item.image }}
                                      style={{
                                        borderRadius: 20,
                                        width: 110,
                                        height: 110
                                      }}
                                    />
                                  </View>
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
            <TouchableOpacity style={[DetailWrapper.NaverView, { flex: 1 }]} onPress={goNaverMap}>
              <Text style={DetailWrapper.ButtonMapText}>길찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[DetailWrapper.CartView, { flex: 2 }]}
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
                    position: 'absolute',
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
    backgroundColor: '#EFEFEF',
    height: 30,
    borderBottomColor: 'green',
    // borderBottomWidth: 1,
    lineHeight: 1,
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
    fontSize: 20,
    marginLeft: 10,
    fontWeight: '700',
  },
  MenuWrapper: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00C1DE',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    marginLeft: 10
  },
  ButtonMapText: {
    color: '#00C1DE',
    fontWeight: 'bold',
    fontSize: 17,
  },
  CartView: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#00C1DE',
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    paddingRight: 10
  },
  commonText: {
    fontFamily: 'Apple SD Gothic Neo',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12
  },
  itemBox: {
    flexDirection: 'row',
    height: 140,
    padding: 15,
    shadowColor: 'grey',
    borderTopWidth: 0.1,
    borderBottomWidth: 0.05,
    marginBottom: 5,
    backgroundColor: 'white',
    elevation: 4,
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#EFEFEF',
    borderColor: '#444',
    marginBottom: 20
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left', fontFamily: 'Apple SD Gothic Neo', fontStyle: 'normal', fontSize: 14 },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left', fontFamily: 'Apple SD Gothic Neo', fontStyle: 'normal', fontSize: 14 },
})
export default DetailPage;