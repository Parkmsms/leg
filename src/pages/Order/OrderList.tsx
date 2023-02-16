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
const width = Dimensions.get('window').width;

const OrderList = ({ navigation, route }: OrderListPagePros) => {
  const [totalAmount, setTotalAmount] = useState<number>(0);
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
        <View style={{flexDirection:'row'}}>
          <Text style={OrderWrapper.BigTitle}>주문상품 총 </Text>
          <Text style={[OrderWrapper.BigTitle,{color:'#00C1DE'}]}>1</Text>
          <Text style={OrderWrapper.BigTitle}>개</Text>
        </View>
        <View style={OrderWrapper.Line}></View>

      </View>

      <View style={{ paddingTop: 10 }}>
        <Text style={OrderWrapper.BigTitle}>
          픽업시간 설정
        </Text>

        <Text style={[OrderWrapper.SmallTitle,{marginTop:3}]}>
          몇분 후에 픽업하길 원하시나요? 픽업시간을 설정해주세요.</Text>
        <View style={{
          flexDirection: 'row',  justifyContent: 'space-between', alignSelf: 'flex-end', alignItems: 'center', alignContent: 'center'
        }}>
          <TouchableOpacity
            onPress={minusAmount}
            disabled={storeInfo.cookTimeAvg === 0 ? true : false}>
            <AntIcon name="minuscircleo" size={20} style={{ color: '#00C1DE' }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, color: '#00C1DE', padding: 3 }}>
            {storeInfo.cookTimeAvg}분
          </Text>
          <TouchableOpacity
            onPress={plusAmount}>
            <AntIcon name="pluscircleo" size={20} style={{ color: '#00C1DE' }} />
          </TouchableOpacity>
        </View>
        <View style={OrderWrapper.Line}></View>
      </View>

      <View style={{ paddingTop: 10 }}>
        <Text style={OrderWrapper.BigTitle}>
          요청사항</Text>
        <TextInput
          multiline={true}
          numberOfLines={10}
          style={{
            height: width * 0.2,
            backgroundColor: 'rgba(0, 193, 222, 0.12)',
            borderRadius: 10,
            textAlignVertical: 'top',
            borderColor: 'rgba(124, 0, 0, 0.05)',
            borderWidth: 1,
            color: '#8F8F8F',
            fontFamily: 'Apple SD Gothic Neo',
            fontSize: 11,
            marginTop:5,
            fontWeight: '500'
          }}
          blurOnSubmit={false}
          onChangeText={(e) => handleRequest(e)}
          placeholder="요청 사항을 적어주세요."
          placeholderTextColor="black"
          underlineColorAndroid="transparent"
        />
        <View style={OrderWrapper.Line}></View>
      </View>

      <View style={{ paddingTop: 10 }}>
        <Text style={OrderWrapper.BigTitle}>
          쿠폰 / 포인트
        </Text>

        <View style={{ flexDirection: 'row', paddingTop: 10, }}>
          <Text style={[OrderWrapper.SmallTitle,{fontSize:12,flex:5,fontWeight:'700'}]}>
            쿠폰 (전체 {coupon.length}장, 적용가능 {coupon.length} 장)
          </Text>
          <TouchableOpacity
            onPress={openModal}
            style={{ borderWidth: 1, borderColor: '#BABABA', borderRadius: 3,flex:1,alignItems:'center',backgroundColor:'#EFEFEF' }}>
            <View>
              <Text style={[OrderWrapper.SmallTitle,{color:'#8F8F8F'}]}>
                쿠폰 선택
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={[OrderWrapper.SmallTitle,{fontSize:12,flex:5,paddingTop:5,fontWeight:'700'}]}>
          포인트 (0 P)
        </Text>
        <Text style={[OrderWrapper.SmallTitle,{fontSize:12,flex:5,paddingTop:5,fontWeight:'700'}]}>
          잔여 포인트 (0 P)</Text>
      </View>

      <View style={{ paddingTop: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={OrderWrapper.BigTitle}>
            총 결제금액</Text>
          <Text style={{ fontSize: 20, color: '#00C1DE', fontWeight: 'bold' }}>
            {route.params?.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <Text style={[OrderWrapper.SmallTitle,{fontSize:12,flex:5,fontWeight:'700'}]}>
            상품금액</Text>
          <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>
            {route.params?.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
          <Text style={[OrderWrapper.SmallTitle,{fontSize:12,flex:5,fontWeight:'700'}]}>
            쿠폰 할인</Text>
          <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>
            0원
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <Text style={[OrderWrapper.SmallTitle,{fontSize:12,flex:5,fontWeight:'700'}]}>
            포인트 할인</Text>
          <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>
            0원
          </Text>
        </View>
        <View style={OrderWrapper.Line}></View>
      </View>

      <View style={{ paddingTop: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
          <Text style={OrderWrapper.BigTitle}>
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
    paddingLeft:25,
    paddingRight:25,
    paddingTop:10
  },
  Line:{
    paddingTop: 10,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#E7E7E7',
  },
  BigTitle:{
    color: 'black',
    fontFamily: 'Apple SD Gothic Neo',
    fontSize: 16,
    fontWeight: '800'
  },
  SmallTitle:{
    color: '#8F8F8F',
    fontFamily: 'Apple SD Gothic Neo',
    fontSize: 11,
    fontWeight: '500'
  }
})
export default OrderList;