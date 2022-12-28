import React, { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RoundedCheckbox } from "react-native-rounded-checkbox";
import AntIcon from "react-native-vector-icons/AntDesign";
import { CartGet, CartPost, getAccessToken, getCouponList } from "../../config/AxiosFunction";
import { initialStoreInfo, StoreInfo } from "../../models/storeInfo";
import Icon from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomPopup from "../../components/Modal/BottomPopUp";

type OrderListPagePros = {
  route: any;
  navigation?: any;
}
type Order = {
  cartId: number,
  userId: number,
  postId: number,
  totalPrice: number
}
type Coupon = {
  id: number;
  isFixed: boolean;
  amount: number;
  percentage: number;
  name: string;
  expiration: number;
  minPrice: number;
  isTargeted: boolean;
  storeId: number;
}[];
const OrderList = ({ navigation, route }: OrderListPagePros) => {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const width = Dimensions.get('window').width;
  const [request, setRequest] = useState<string>('');
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(initialStoreInfo);
  const [order, setOrder] = useState<Order>({
    cartId: 0,
    userId: 0,
    postId: 0,
    totalPrice: 0
  });
  const [coupon, setCoupon] = useState<Coupon>([]);
  const [modalOpen, setModalOpen] = useState(false);


  const postCart = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await CartPost(
      accessToken,
      route.params?.cart
    );
    console.log(response.data);
    setOrder(response.data);
    await AsyncStorage.setItem('order', JSON.stringify(response.data));
  }

  const getCart = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await CartGet(
      accessToken,
      order.cartId
    )
    console.log(response.data);
    setOrder(response.data);
  }

  const getCart2 = async () => {
    const order = await AsyncStorage.getItem('order');
    console.log("이미 만들어놓은 카트", order);
    if (order) {
      setOrder(JSON.parse(order));
    }
  }



  useEffect(() => {
    console.log(route.params?.postId);
    console.log(route.params?.itemSets);
    console.log(route.params?.totalPrice);
    console.log(route.params?.storeInfo);
    //storeInfo 설정
    setStoreInfo(route.params?.storeInfo);
    console.log(route.params?.cart);
    console.log(order);

    // setTotalAmount(storeInfo.cookTimeAvg)
  }, [])

  const getCoupons = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await getCouponList(
      accessToken,
    )
    console.log(response.data);
    setCoupon(response.data);
  }

  useEffect(() => {
    if (order.cartId == 0) {
      postCart();
    } else {
      getCart2();
    }
    getCoupons();
  }, [])

  const minusAmount = () => {
    setStoreInfo({
      ...storeInfo,
      cookTimeAvg: storeInfo.cookTimeAvg - 5
    })
  }
  const plusAmount = () => {
    setStoreInfo({
      ...storeInfo,
      cookTimeAvg: storeInfo.cookTimeAvg + 5
    });
  }
  const handleRequest = (e: string) => {
    setRequest(e)
    console.log(e);

  }
  const RoundedCheckBox = () => {
    return (
      <View>
        <TextInput />카카오페이
      </View>
    )
  }
  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <ScrollView style={OrderWrapper.MainContainer}>

      <View style={{ paddingTop: 10 }}>
        <Text style={{ color: 'black', fontFamily: 'Apple SD Gothic Neo', fontSize: 20, fontWeight: '800' }}>주문상품 총 1개</Text>
        <View style={{
          paddingTop: 20,
          flex: 0.1,
          borderStyle: 'solid',
          borderBottomWidth: 2,
          borderColor: 'lightgray',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center'
        }}></View>

      </View>

      <View style={{ paddingTop: 10 }}>
        <Text style={{ color: 'black', fontFamily: 'Apple SD Gothic Neo', fontSize: 20, fontWeight: '800' }}>
          픽업시간 설정
        </Text>

        <Text style={{ paddingTop: 10, fontWeight: 'bold' }}>
          몇분 후에 픽업하길 원하시나요? 설정해주세요.</Text>
        <View style={{
          flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignSelf: 'center', alignItems: 'center', alignContent: 'center'
        }}>
          <TouchableOpacity
            onPress={minusAmount}
            disabled={storeInfo.cookTimeAvg === 0 ? true : false}>
            <AntIcon name="minuscircleo" size={25} style={{ color: '#00C1DE' }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 25, color: '#00C1DE', padding: 10 }}>
            {storeInfo.cookTimeAvg}분
          </Text>
          <TouchableOpacity
            onPress={plusAmount}>
            <AntIcon name="pluscircleo" size={25} style={{ color: '#00C1DE' }} />
          </TouchableOpacity>
        </View>
        <View style={{
          paddingTop: 10,
          flex: 0.1,
          borderStyle: 'solid',
          borderBottomWidth: 2,
          borderColor: 'lightgray',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center'
        }}></View>
      </View>

      <View style={{ paddingTop: 10 }}>
        <Text style={{ color: 'black', fontFamily: 'Apple SD Gothic Neo', fontSize: 20, fontWeight: '800' }}>
          요청사항</Text>
        <TextInput
          multiline={true}
          numberOfLines={10}
          style={{
            width: width * 0.9,
            height: width * 0.3,
            backgroundColor: 'rgba(0, 193, 222, 0.12)',
            borderRadius: 10,
            textAlignVertical: 'top',
            margin: 10,
            borderColor: 'rgba(124, 0, 0, 0.05)',
            borderWidth: 1,
          }}
          blurOnSubmit={false}
          onChangeText={(e) => handleRequest(e)}
          placeholder="요청 사항을 적어주세요."
          placeholderTextColor="black"
          underlineColorAndroid="transparent"
        />
        <View style={{
          paddingTop: 20,
          flex: 0.1,
          borderStyle: 'solid',
          borderBottomWidth: 2,
          borderColor: 'lightgray',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center'
        }}></View>
      </View>

      <View style={{ paddingTop: 10 }}>
        <Text style={{ color: 'black', fontFamily: 'Apple SD Gothic Neo', fontSize: 20, fontWeight: '800' }}>
          쿠폰 / 포인트
        </Text>

        <View style={{ flexDirection: 'row', paddingTop: 10, }}>
          <Text style={{ paddingRight: 100 }}>
            쿠폰
          </Text>
          <Text style={{ paddingRight: 30 }}>
            전체 {coupon.length}장, 적용가능 {coupon.length} 장
          </Text>
          <TouchableOpacity
            onPress={openModal}
            style={{ borderWidth: 2, borderColor: 'gray', borderRadius: 5 }}>
            <View>
              <Text style={{ fontSize: 12, fontWeight: 'bold', padding: 5 }}>
                쿠폰 선택
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{
          paddingTop: 5,
          flex: 0.1,
          borderStyle: 'solid',
          borderBottomWidth: 2,
          borderColor: 'lightgray',
          width: '70%',
          justifyContent: 'center',
          alignContent: 'center'
        }}></View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ paddingTop: 10, paddingRight: 100 }}>
            포인트
          </Text>
          <Text style={{ paddingTop: 10 }}>
            0 P
          </Text>
        </View>

        <View style={{
          paddingTop: 5,
          flex: 0.1,
          borderStyle: 'solid',
          borderBottomWidth: 2,
          borderColor: 'lightgray',
          width: '70%',
          justifyContent: 'center',
          alignContent: 'center'
        }}></View>

        <Text style={{ paddingTop: 10 }}>
          잔여 포인트 0 P</Text>
        <View style={{
          paddingTop: 20,
          flex: 0.1,
          borderStyle: 'solid',
          borderBottomWidth: 2,
          borderColor: 'lightgray',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center'
        }}></View>
      </View>

      <View style={{ paddingTop: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20 }}>
          <Text style={{ color: 'black', fontFamily: 'Apple SD Gothic Neo', fontSize: 20, fontWeight: '800' }}>
            총 결제금액</Text>
          <Text style={{ fontSize: 20, color: '#00C1DE', fontWeight: 'bold' }}>
            {route.params?.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
          <Text style={{ color: 'gray', fontFamily: 'Apple SD Gothic Neo', fontSize: 15, fontWeight: '800' }}>
            상품금액</Text>
          <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>
            {route.params?.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
          <Text style={{ color: 'gray', fontFamily: 'Apple SD Gothic Neo', fontSize: 15, fontWeight: '800' }}>
            쿠폰 할인</Text>
          <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>
            0원
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
          <Text style={{ color: 'gray', fontFamily: 'Apple SD Gothic Neo', fontSize: 15, fontWeight: '800' }}>
            포인트 할인</Text>
          <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>
            0원
          </Text>
        </View>
        <View style={{
          paddingTop: 20,
          flex: 0.1,
          borderStyle: 'solid',
          borderBottomWidth: 2,
          borderColor: 'lightgray',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center'
        }}></View>

      </View>

      <View style={{ paddingTop: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
          <Text style={{ color: 'black', fontFamily: 'Apple SD Gothic Neo', fontSize: 20, fontWeight: '800' }}>
            결제 수단
          </Text>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center'
        }}>
          <RoundedCheckbox
            isChecked={false}
            checkedColor={"#00C1DE"}>
            <Icon
              size={10}
              name="circle"
              color={"#fdfdfd"}
            />
          </RoundedCheckbox>
          <Image
            source={require('../../assets/kakaopay.png')}
          ></Image>
          {/* {RoundedCheckBox()} */}
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
            style={{ backgroundColor: '#00C1DE', borderRadius: 10, height: 50, width: 350, justifyContent: 'center', alignContent: 'center' }}>
            <Text style={{ fontWeight: '700', fontFamily: 'Urbanist', fontSize: 20, color: 'white', alignSelf: 'center', alignItems: 'center', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>
              {route.params?.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 주문하기</Text>
          </TouchableOpacity>
        </View>

      </View>
      <BottomPopup
        open={modalOpen}
        close={closeModal}
        header={"회원가입 완료!"}
        kind="coupon"
        onTouchOutSide={closeModal}
      />
    </ScrollView >
  )
}
const OrderWrapper = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  }
})
export default OrderList;