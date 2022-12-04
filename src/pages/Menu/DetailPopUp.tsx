import React, { useEffect, useState } from "react"
import { Dimensions, Image, ImageBackground, Modal, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Linking, Button, TouchableWithoutFeedback } from "react-native";
import { getAccessToken, getStoreInfo, getStoreMenu1 } from "../../config/AxiosFunction";
import { initialStoreInfo, StoreInfo } from "../../models/storeInfo";
import Icon from 'react-native-vector-icons/Ionicons';

type DetailPopupProps = {
  open: boolean;
  close: any;
  postId: number;
  onTouchOutSide: any;
}
type StoreMenu = {
  id: number;
  bigCategory: string;
  bigItems: StoreMenu1[];
}
type StoreMenu1 = {
  menuId: number;
  name: string;
  description: string;
  image: string;
  price: number;
}
const DetailPopup = (props: DetailPopupProps) => {
  const { open, close, postId, onTouchOutSide } = props;
  const [isShow, setIsShow] = useState<boolean>(false);
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(initialStoreInfo);
  const [active, setActive] = useState<number>(0);
  const [storeMenu, setStroeMenu] = useState<StoreMenu[]>([]);

  const deviceHeight = Dimensions.get("window").height;
  const { width } = Dimensions.get('window');
  const height = width * 0.6;

  const onPictureChange = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.ceil(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
    if (slide !== active) {
      setActive(slide);
    }
  }

  const detailStoreInfo = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await getStoreInfo(accessToken, postId);
    console.log("가게정보: ", response.data);
    setStoreInfo(response.data)
  }

  const getStoreMenu = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await getStoreMenu1(accessToken, postId);
    console.log(response.data);
    setStroeMenu(response.data)
  }

  const confirm = (item: StoreMenu1) => {
    console.log(item.image);
  }

  const outsideTouchable = (onTouchOutSide: any) => {
    const view = <View style={{ flex: 0.1, width: '100%' }} />
    if (!onTouchOutSide)
      return view
    else {
      return (
        <TouchableWithoutFeedback onPress={onTouchOutSide}
          style={{ flex: 1, width: '100%' }}>
          {view}
        </TouchableWithoutFeedback>
      )
    }
  }

  useEffect(() => {
    if (open && postId) {
      setIsShow(true)
      detailStoreInfo()
      getStoreMenu()

    } else if (close) {
      setIsShow(false)
    }
  }, [open])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={isShow}
        onRequestClose={close}
        style={{ maxHeight: deviceHeight * 0.5 }}
      >
        <View style={{
          flex: 1,
          backgroundColor: '#000000AA',
        }}>
          {outsideTouchable(onTouchOutSide)}
          <View style={{ flex: 0.5, }}>
            <ScrollView
              pagingEnabled
              horizontal
              onScroll={onPictureChange}
              showsHorizontalScrollIndicator={false}
              style={{ width: width, height: height * 0.9 }}>
              {storeInfo.postImages?.map((post: string, index: number) => {
                return (
                  <Image
                    key={index}
                    source={{ uri: post ? post : 'null' }}
                    style={{
                      resizeMode: 'cover',
                      borderRadius: 20,
                      width: width,
                      height: height * 0.9,
                    }} />
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
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            borderWidth: 5,
            borderColor: 'rgba(0, 0, 0, 0.05)',
            shadowColor: '#52006A',
            elevation: 5,
            // padding: 50,

          }}>
            <ScrollView style={DetailWrapper.MainContainer}>
              <View style={{ flex: 1, paddingTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', paddingRight: 20 }}>{storeInfo.storeName}</Text>
                <Icon style={{ justifyContent: 'center', alignItems: 'center' }} name="star" color={"#00C1DE"} size={20} />
                <Text style={{ fontSize: 20, paddingRight: 20 }}>{storeInfo.storeStar}</Text>
                <Text style={{ fontSize: 15 }}>누적 포장수 {storeInfo.orderCount}+</Text>
              </View>
              <View style={{ flex: 1, paddingTop: 10, }}>
                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{storeInfo.postTitle}</Text>
              </View>
              <View style={{ flex: 1, paddingTop: 15 }}>
                <Text>평균 조리시간{storeInfo.cookTimeAvg}분</Text>
              </View>
              <View style={{
                flex: 1,
                paddingTop: 15,
                paddingBottom: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderStyle: 'solid',
                borderBottomWidth: 1,
                borderColor: 'lightgray',
                width: '95%',
              }}>
                <Text>{storeInfo.storeAddress}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(`tel:${storeInfo.storePhone}`)}>
                  <Icon name="call" color={'#000'} size={20} style={{ paddingRight: 10 }} />
                </TouchableOpacity>
              </View>

              <View style={{
                flex: 0.3,
                paddingTop: 15,
                paddingBottom: 15,
                borderStyle: 'solid',
                borderBottomWidth: 1,
                borderColor: 'lightgray',
                width: '95%',
              }}>
                <Text style={{ color: 'black' }}>{storeInfo.postContent}</Text>
              </View>

              <View style={DetailWrapper.MenuHeaderWrapper}>
                <Text style={DetailWrapper.MenuHeader}>메뉴 🍽</Text>
              </View>
              <View style={DetailWrapper.MenuWrapper}>
                <ScrollView>
                  {storeMenu?.map((menu1: StoreMenu, index: number) => {
                    return (
                      <View key={index}>
                        {menu1.bigItems.map((item: StoreMenu1, index: number) => {
                          return (
                            <TouchableOpacity key={index}
                              onPress={() => confirm(item)}
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
                                paddingTop: 20,
                                shadowColor: '#52006A',
                                backgroundColor: 'white',
                                elevation: 5,
                              }}>
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
                                }}>{item.name}</Text>
                                <Text style={{
                                  color: '#959595',
                                  fontWeight: 'bold',
                                  marginBottom: 10,
                                }}>{item.description}</Text>
                                <Text style={{
                                  color: 'black',
                                  fontSize: 20,
                                  fontWeight: 'bold',
                                  marginBottom: 10,
                                }}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
                              </View>
                              <Image
                                source={{ uri: item.image }}
                                style={{
                                  borderRadius: 20,
                                  width: 100,
                                  height: 100
                                }}
                              />
                            </TouchableOpacity>
                          )
                        })}
                      </View>
                    )
                  })}
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </View>



      </Modal>

    </SafeAreaView>
  )
}
const DetailWrapper = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
    // alignContent: 'center',
    // justifyContent: 'center',
    // padding: 10,
    flexDirection: 'column',
    paddingLeft: 10,
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
  MenuHeaderWrapper: {
    width: 350,
    padding: 10,
    flex: 4,
    flexDirection: "row",
    // justifyContent: 'space-between'
  },
  MenuHeader: {
    color: 'black',
    fontSize: 25,
    fontWeight: '800',
  },
  MenuWrapper: {
    flex: 1,
    backgroundColor: 'white',
    // alignContent: 'center',
    // padding: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
  }
})
export default DetailPopup;