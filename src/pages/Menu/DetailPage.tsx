import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, Linking, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getAccessToken, getStoreInfo, getStoreMenu1 } from "../../config/AxiosFunction";
import { initialStoreInfo, StoreInfo } from "../../models/storeInfo";
import DetailPopup from "./DetailPopUp";
import Icon from 'react-native-vector-icons/Ionicons';
import { StoreMenu1 } from "../../models/storemenu";

type DetailPageProps = {
  route: any;
  navigation?: any;
}
type StoreMenu = {
  id: number;
  bigCategory: string;
  bigItems: StoreMenu1[];
}

const DetailPage = ({ navigation, route }: DetailPageProps) => {
  const [storeMenu, setStroeMenu] = useState<StoreMenu[]>([]);
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(initialStoreInfo);
  const [active, setActive] = useState<number>(0);
  // const [modalOpen, setModalOpen] = useState(false);
  const [ready, setReady] = useState<boolean>(true);
  const deviceHeight = Dimensions.get("window").height;
  const { width } = Dimensions.get('window');
  const height = width * 0.6;

  const detailStoreInfo = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await getStoreInfo(accessToken, route.params?.detailId);
    console.log("가게정보!: ", response.data);
    setStoreInfo(response.data)
  }

  const getStoreMenu = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await getStoreMenu1(accessToken, route.params?.detailId);
    // console.log("가게 대메뉴정보!:", response.data);
    setStroeMenu(response.data)
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
    if (route.params?.detailId) {
      setTimeout(() => {
        detailStoreInfo()
        getStoreMenu()
        setReady(false)
      }, 2000)

      // openModal()
    }
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {ready ?
        <View style={[DetailWrapper.container, DetailWrapper.horizontal]}>
          <ActivityIndicator size="large" />
        </View> :
        <>
          <ScrollView style={DetailWrapper.MainContainer}>
            <View style={{ flex: 0.5, height: height }}>
              <ScrollView
                pagingEnabled
                horizontal
                onScroll={onPictureChange}
                showsHorizontalScrollIndicator={false}
                style={{ width: width, height: height }}>
                {storeInfo.postImages?.map((post: string, index: number) => {
                  return (
                    <Image
                      key={index}
                      source={{ uri: post ? post : 'null' }}
                      style={{
                        resizeMode: 'cover',
                        // borderRadius: 20,
                        width: width,
                        height: height,
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
                <Text>평균 조리시간 {storeInfo.cookTimeAvg}분</Text>
              </View>
              <View style={{
                flex: 1,
                paddingTop: 15,
                paddingBottom: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',

              }}>
                <Text>{storeInfo.storeAddress}</Text>
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
                borderBottomWidth: 1,
                borderColor: 'lightgray',
                width: '95%',
              }}>
                <Text style={{ color: 'black' }}>{storeInfo.postContent}</Text>
              </View>

              <View style={DetailWrapper.Horizon}></View>

              <View style={DetailWrapper.MenuHeaderWrapper}>
                <Text style={DetailWrapper.MenuHeader}>메뉴 🍽</Text>
                <ScrollView
                  pagingEnabled
                  horizontal
                  showsHorizontalScrollIndicator={false}>
                  {storeMenu?.map((menu1: StoreMenu, index: number) =>
                    <TouchableOpacity
                      key={index}
                      style={{
                        minWidth: 70,
                        borderWidth: 1,
                        // width: 80,
                        height: 30,
                        // backgroundColor: params.foodType === menu ? 'linear-gradient(180deg, #00C1DE 0%, rgba(27, 147, 234, 0.93) 100%);' : '#E8E8E8',
                        // backgroundColor: 'rgba(27, 147, 234, 0.93)',
                        borderRadius: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 3
                      }}>
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
                                width: 360,
                                height: 150,
                                borderColor: 'rgba(0, 0, 0, 0.05)',
                                paddingLeft: 15,
                                paddingTop: 25,
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
                                }}>{item.bigItem}</Text>
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
            </View>
          </ScrollView>
          <View style={DetailWrapper.footer}>
            <TouchableOpacity style={DetailWrapper.CartView}>
              <Text style={DetailWrapper.ButtonText}>카트보기</Text>
            </TouchableOpacity>
          </View>
        </>

      }

    </SafeAreaView>
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
    flex: 1,
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
    bottom: -10,
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
  CartView: {
    padding: 15,
    width: 300,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#00C1DE'
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
})
export default DetailPage;