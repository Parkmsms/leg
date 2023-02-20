import React, { ChangeEvent, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Dimensions, ScrollView } from "react-native";
import { CartPost, getAccessToken } from "../../config/AxiosFunction";
import { initialStoreInfo, StoreInfo } from "../../models/storeInfo";
import { initialStoreMenu1, StoreMenu1 } from "../../models/storemenu";
import CheckBox from "@react-native-community/checkbox";
import { RoundedCheckbox, PureRoundedCheckbox } from "react-native-rounded-checkbox";
import Icon from "react-native-vector-icons/Entypo";
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteCartList,
} from '../../slices/item';

type CartListPageProps = {
  route: any;
  navigation?: any;
}
type StoreMenuOption = {
  cartId: number,
  bigItem: string,
  storeId: number,
  storeNm: string;
  id: number;
  description?: string;
  price: number;
  image?: string;
  isExausted?: boolean;
  totalAmount: number;
  itemSize: string;
}

type PostCart = {
  postId: number;
  itemSets: Item[];
  totalPrice: number;
}

type Item = {
  bigItemId: number;
  smallItemIds: number[];
  quantity: number;
}
type Cart = {
  cartId: number;
  userId: number;
  postId: number;
  totalPrice: number;
}

const width = Dimensions.get('window').width;

const CartList = ({ navigation, route }: CartListPageProps) => {
  const dispatch = useDispatch();
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(initialStoreInfo);
  const [storeMenu, setStoreMenu] = useState<StoreMenu1>(initialStoreMenu1);
  const [radioButtons, setRadioButtons] = useState<StoreMenuOption[]>([]);
  const [cart, setCart] = useState<PostCart>();
  const [request, setRequest] = useState<Item[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(true);
  const [checkList, setCheckList] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const allCheck = (e: any) => {
    if (e) {
      let test = radioButtons.map(radio => radio.id)
      setCheckList(test)
    } else {
      setCheckList([])
    }
  }
  const onChecked = (id: number) => {
    console.log("선택한 ID", id);

    if (checkList.some((item: number) => item === id)) {
      // 선택한 id와 같지 않은것을 걸러내 
      setCheckList(checkList.filter((item: number) => item !== id));
      // setRadioButtons(radioButtons.filter((radio: StoreMenuOption) => radio.id !== id));
    } else {
      setCheckList(checkList.concat(id));

      // setRadioButtons(radioButtons.concat(choose));
    }

    // setCart({
    //   ...cart,
    //   postId: route.params?.postId,
    //   itemSets: [
    //     {
    //       bigItemId: storeMenu.id,
    //       smallItemIds: radioButtons.map(radio => radio.id),
    //       quantity: route.params?.amount
    //     }
    //   ],
    //   totalPrice: route.params?.price
    // })
  }
  const delCart = (item: number, id: number) => {

    radioButtons.forEach((item: any, index: number) => {
      if (item.cartId === item) {
        radioButtons.splice(index, 1);
      }
    })
    setRadioButtons(radioButtons.filter((radio: StoreMenuOption) => radio.cartId !== item));
    setCheckList(checkList.filter((item: number) => item !== id));
    dispatch(deleteCartList(item));

  }

  const goOrder = () => {
    if (checkList.length === 0) {

    }
    else {

    }
    navigation.navigate('OrderList', {
      //전체 가격
      totalPrice: totalPrice,
      //체크박스 클릭한 상품 id
      checkList: checkList,
      //메뉴정보 List
      radioButtons: radioButtons
    })
  }
  //첫 실행시 렌더링
  useEffect(() => {
    console.log("세부메뉴아이템 ", route.params?.smallItem);
    //세부메뉴아이템 설정
    setRadioButtons(route.params?.smallItem);
  }, []);

  //가격 또는 체크박스 변경시 렌더링
  useEffect(() => {
    //총액 계산
    console.log("checkList=", checkList)
    console.log("가격계산진행", checkList.length)
    if (checkList.length === 0) {
      // setTotalPrice(route.params?.smallItem.map((item: any) => item.price).reduce((prev: any, curr: any) => prev + curr, 0))
      setTotalPrice(0);
    } else {
      console.log("test", radioButtons.map((item) => item.price));
      let selectFullPrice = 0;
      let checkItemPrice = [];
      for (var j = 0; j < checkList.length; j++) {
        checkItemPrice.push(radioButtons.filter((item) => item.id === checkList[j]).map((item) => item.price)[0]);
      }
      for (var i in checkItemPrice) {
        selectFullPrice += checkItemPrice[i];
      }
      console.log("총액:", checkItemPrice);
      setTotalPrice(selectFullPrice);
    }

  }, [checkList, radioButtons])


  return (
    <View style={CartWrapper.MainContainer}>

      <View style={[CartWrapper.Horizon, { backgroundColor: 'white' }]}>
        <CheckBox
          nativeID="all"
          style={{ margin: 3 }}
          onCheckColor="#00C1DE"
          disabled={false}
          onValueChange={(e) => allCheck(e)}
          value={checkList.length === radioButtons.length ? true : false}
        // onChange={allAgreeHnalder} 
        />
        <Text style={{
          fontSize: 15, fontWeight: 'bold', color: 'black',
          fontFamily: 'Apple SD Gothic Neo'
        }}>
          전체 선택</Text>
      </View>

      <View style={{
        flex: 5,
        flexDirection: 'column',
      }}>
        {storeMenu === undefined &&
          <View style={{ justifyContent: 'center', alignContent: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>
              메뉴를 추가해주세요!
            </Text>
          </View>
        }
        <ScrollView>
          {storeMenu !== undefined && radioButtons.length !== 0 &&
            radioButtons?.map((cartItem: StoreMenuOption, index: number) => {
              return (
                <SafeAreaView style={CartWrapper.MainContainer} key={index}>
                  <View style={CartWrapper.CenterAlign} >
                    <View style={CartWrapper.ContentsBox}>
                      <View style={[CartWrapper.Vertical, { marginLeft: 5 }]}>
                        <View style={CartWrapper.Horizontal}>
                        </View>
                      </View>
                      <View style={CartWrapper.Horizontal}>
                        <View style={{
                          justifyContent: 'center',
                          alignContent: 'center',
                          paddingRight: 5
                        }}>
                          <CheckBox
                            // nativeID="all"
                            style={{ margin: 1, paddingRight: 20 }}
                            onCheckColor="#00C1DE"
                            tintColors={{ true: '#00C1DE', false: 'black' }}
                            disabled={false}
                            onValueChange={() => onChecked(cartItem.id)}
                            value={checkList.includes(cartItem.id) ? true : false}
                          // onChange={() => onChecked(storeMenu.id)}
                          />
                        </View>
                        <View style={CartWrapper.CenterAlign}>
                          <Image
                            // source={require('../../assets/main.png')}
                            source={{ uri: cartItem.image ? cartItem.image : 'none' }}
                            style={{
                              width: 80,
                              height: 80,
                              aspectRatio: 1.1,
                              borderRadius: 18,
                              resizeMode: 'stretch'
                            }}
                          />
                        </View>
                        <View
                          style={[CartWrapper.Vertical, {
                            marginLeft: 10,
                            padding: 15
                          }]}>
                          <Text style={[CartWrapper.FontText,
                          {
                            fontSize: 15,
                            marginBottom: 10,
                            color: '#000000',
                            fontWeight: 'bold'
                          }]}>{cartItem.storeNm}</Text>
                          <Text style={[CartWrapper.FontText,
                          {
                            marginBottom: 10,
                            color: '#000000',
                            fontWeight: '500',
                          }]}>{cartItem.bigItem} {cartItem.itemSize} x {cartItem.totalAmount} </Text>
                          <Text style={[CartWrapper.FontText,
                          {
                            color: '#00C1DE',
                            fontWeight: '600',
                          }]}>
                            {cartItem.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => delCart(cartItem.cartId, cartItem.id)}
                          style={{ marginLeft: 1, position: 'absolute', left: width * 0.85 }}
                        >
                          <Text style={[CartWrapper.FontText, { fontSize: 16 }]}>✖</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{
                        flex: 0.1,
                        borderStyle: 'solid',
                        borderBottomWidth: 1,
                        borderColor: 'gray',
                        width: '100%',
                        justifyContent: 'center',
                        alignContent: 'center'
                      }}></View>

                      <View style={{ flexDirection: "row", padding: 10 }}>
                        <View>
                          <Text style={{ paddingBottom: 5, fontSize: 15, fontWeight: 'bold' }}>상품금액: {cartItem.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
                          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>할인금액: 0원</Text>
                        </View>
                        <View style={{
                          paddingLeft: 35,
                          justifyContent: 'center',
                          alignContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row'
                        }}>
                          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>결제 예상: </Text>
                          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#00C1DE' }}> {cartItem.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
                        </View>
                      </View>
                    </View>
                  </View >
                </SafeAreaView>
              )
            }
            )}
        </ScrollView>
      </View>
      <View style={{ flex: 0.7, flexDirection: 'row', padding: 20, justifyContent: 'center', alignContent: 'center' }}>
        {/* <View style={{ height: 50, justifyContent: 'center', alignContent: 'center' }}>
          <Text style={{
            color: 'black', fontSize: 20, fontWeight: 'bold',
            alignSelf: 'center', alignItems: 'center', textAlign: 'center',
            justifyContent: 'center', alignContent: 'center'
          }}>가격</Text>
        </View> */}
        <TouchableOpacity
          onPress={goOrder}
          style={{ backgroundColor: '#00C1DE', borderRadius: 10, height: 50, width: 350, justifyContent: 'center', alignContent: 'center' }}>
          <Text style={{ fontWeight: '700', fontFamily: 'Urbanist', fontSize: 20, color: 'white', alignSelf: 'center', alignItems: 'center', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>
            {/* {route.params?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} */}
            {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 주문하기</Text>
        </TouchableOpacity>
      </View>
    </View >
  )
}
const CartWrapper = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#EFEFEF'
  },
  Horizon: {
    width: '100%',
    textAlign: 'center',
    borderBottomColor: 'gray',
    // borderBottomWidth: 1,
    lineHeight: 1,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
  },
  CenterAlign: {
    justifyContent: "center",
    alignItems: 'center',
  },
  ContentsBox: {
    borderWidth: 1,
    width: width,
    marginTop: 5,
    sborderRadius: 1,
    paddingLeft: 26,
    paddingRight: 26,
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    backgroundColor: 'white',
  },
  Vertical: {
    flexDirection: 'column'
  },
  Horizontal: {
    flexDirection: 'row'
  },
  ActivateButton: {
    backgroundColor: '#00C1DE',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    margin: 5,
    flex: 2
  },
  cancleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderColor: '#ee5960',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    margin: 5,
    flex: 2
  },
  cancleButtonText: {
    fontSize: 17,
    fontFamily: 'Apple SD Gothic Neo',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#ee5960',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  InActivateButton: {
    backgroundColor: '#3E3E3E',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center'
  },
  ButtonText: {
    fontSize: 17,
    fontFamily: 'Urbanist',
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  FontText: {
    fontFamily: 'Apple SD Gothic Neo',
    fontStyle: 'normal',
    letterSpacing: 0.5,
  },
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

  StatusButton: {
    backgroundColor: '#3E3E3E',
    borderRadius: 8,
    width: 22,
    justifyContent: 'center',
    alignContent: 'center'
  },
  StatusText: {
    fontSize: 16,
    fontFamily: 'Urbanist',
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },

  AddPhotoButtonText: {
    fontSize: 17,
    fontFamily: 'Apple SD Gothic Neo',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#00C1DE',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },

  AddPhotoButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderColor: '#00C1DE',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    margin: 5,
    flex: 2
  },
})
export default CartList;