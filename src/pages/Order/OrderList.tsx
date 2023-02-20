import React, { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { RoundedCheckbox } from "react-native-rounded-checkbox";
import AntIcon from "react-native-vector-icons/AntDesign";
import { CartGet, CartPost, getAccessToken, getCouponList, UserSimpleAPI } from "../../config/AxiosFunction";
import { initialStoreInfo, StoreInfo } from "../../models/storeInfo";
import Icon from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomPopup from "../../components/Modal/BottomPopUp";
import { RadioButton } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { initialUserSimpleInfo, UserSimpleInfo } from "../../models/userProfile";

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
  id: number,
  couponNo: string,
  name: string,
  isFixed: boolean,
  amount: number,
  percentage: number,
  expiration: string,
  minPrice: number,
  isTargeted: boolean,
  storeId: number
}[];

const width = Dimensions.get('window').width;

const OrderList = ({ navigation, route }: OrderListPagePros) => {
  const[amount,setAmount] = useState<number>(0);
  //계산 총액
  const [totalAmount, setTotalAmount] = useState<number>(0);
  //총 상품 갯수
  const [quantity, setQuantity] = useState<number>(0);
  //쿠폰
  const [couponInfo, setCouponInfo] = useState<Coupon>([])
  const [request, setRequest] = useState<string>('');
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(initialStoreInfo);
  const [userSimpleInfo, setUserSimpleInfo] = useState<UserSimpleInfo>(initialUserSimpleInfo);
  const [order, setOrder] = useState<Order>({
    cartId: 0,
    userId: 0,
    postId: 0,
    totalPrice: 0
  });
  const [inputs, setInputs] = useState({
    request: '',
    discPoint: ''
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

  const getUserInfo = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await UserSimpleAPI(accessToken);
    setUserSimpleInfo(response.data)
  }

  useEffect(() => {
    //유저정보 
    getUserInfo();
    //쿠폰정보
    getCoupons();
    //초기 총액 설정
    setAmount(route.params?.totalPrice)
    //최종금액 설정
    setTotalAmount(route.params?.totalPrice);
    //상품갯수 설정
    setQuantity(route.params?.checkList.length)
  }, [])

  const getCoupons = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await getCouponList(accessToken)
    setCouponInfo(response.data[0]);
  }

  //할인 적용
  const discount = () =>{
    setTotalAmount(amount - parseInt(inputs.discPoint));
  }


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
  const handleRequest = (keyvalue:string, e: string) => {

    setInputs({
      ...inputs, 
      [keyvalue]: e 
    });

    if(keyvalue=="discPoint"){
      if(parseInt(e)>userSimpleInfo.point){
        setInputs({
          ...inputs, 
          [keyvalue]: userSimpleInfo.point.toString()
        });
      }

      if(parseInt(e)>amount){
        setInputs({
          ...inputs, 
          [keyvalue]: amount.toString()
        });
      }

      if(e=="" || e==undefined){
        console.log("active",e)
        console.log(amount);
        // setTotalAmount((totalAmount)=> {return totalAmount=amount});
      }
    }

    // setTotalAmount(()=>{ return totalAmount-parseInt(e)});
    
  }

  const RoundedCheckBox = () => {
    return (
      <View>
        <TextInput />카카오페이
      </View>
    )
  }
  const openModal = () => {
    console.log(inputs)
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <ScrollView style={OrderWrapper.MainContainer}>
      <View style={{ paddingTop: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={OrderWrapper.BigTitle}>주문상품 총 </Text>
          <Text style={[OrderWrapper.BigTitle, { color: '#00C1DE' }]}>{quantity}</Text>
          <Text style={OrderWrapper.BigTitle}>개</Text>
        </View>
        <View style={OrderWrapper.Line}></View>
      </View>
      <View style={{ marginTop: 15 }}>
        <Text style={OrderWrapper.BigTitle}>
          픽업시간 설정
        </Text>
        <Text style={[OrderWrapper.SmallTitle, { marginTop: 3 }]}>
          몇분 후에 픽업하길 원하시나요? 픽업시간을 설정해주세요.</Text>
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'flex-end', alignItems: 'center', alignContent: 'center'
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

      <View style={{ marginTop: 15 }}>
        <Text style={OrderWrapper.BigTitle}>
          요청사항</Text>
        <TextInput
          multiline={false}
          numberOfLines={10}
          style={{
            height: width * 0.1,
            backgroundColor: 'rgba(0, 193, 222, 0.12)',
            borderRadius: 10,
            textAlignVertical: 'center',
            borderColor: 'rgba(124, 0, 0, 0.05)',
            borderWidth: 1,
            color: '#8F8F8F',
            fontFamily: 'Apple SD Gothic Neo',
            fontSize: 11,
            marginTop: 5,
            fontWeight: '500'
          }}
          value={inputs.request}
          blurOnSubmit={false}
          onChangeText={(e) => handleRequest("request",e)}
          placeholder="요청 사항을 적어주세요."
          placeholderTextColor="8F8F8F"
          underlineColorAndroid="transparent"
        />
        <View style={OrderWrapper.Line}></View>
      </View>

      <View style={{ marginTop: 15 }}>
        <Text style={OrderWrapper.BigTitle}>
          쿠폰/포인트
        </Text>

        <View style={{ flexDirection: 'row', }}>
          <Text style={[OrderWrapper.SmallTitle, { flex: 5, fontWeight: '700' }]}>
            쿠폰 (전체 {coupon.length}장, 적용가능 {coupon.length} 장)
          </Text>
          <TouchableOpacity
            onPress={openModal}>
            <Text style={[OrderWrapper.SmallTitle, { color: '#00C1DE', fontWeight: 'bold', borderRadius: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EFEFEF', }]}>
              쿠폰 선택
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[OrderWrapper.SmallTitle, { flex: 5, fontWeight: '700' }]}>
          잔여 포인트 ({userSimpleInfo.point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')})
        </Text>
      </View>

      <View style={{ marginTop: 15 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={OrderWrapper.BigTitle}>
            총 결제금액
          </Text>
          <Text style={{ color: '#00C1DE', fontWeight: 'bold' }}>
            {totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <Text style={[OrderWrapper.SmallTitle, { flex: 5, fontWeight: '700' }]}>
            상품금액</Text>
          <Text style={[OrderWrapper.SmallTitle, { color: 'black', fontWeight: 'bold' }]}>
            {totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <Text style={[OrderWrapper.SmallTitle, { flex: 5, fontWeight: '700' }]}>
            쿠폰 할인</Text>
          <Text style={[OrderWrapper.SmallTitle, { color: 'black', fontWeight: 'bold' }]}>
            0원
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <Text style={[OrderWrapper.SmallTitle, { flex: 5, fontWeight: '700' }]}>
            포인트 할인</Text>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={{
              height: width * 0.08,
              backgroundColor: 'rgba(0, 193, 222, 0.12)',
              borderRadius: 10,
              textAlignVertical: 'center',
              borderColor: 'rgba(124, 0, 0, 0.05)',
              borderWidth: 1,
              color: '#8F8F8F',
              fontFamily: 'Apple SD Gothic Neo',
              fontSize: 8,
              fontWeight: '500'
            }}
            keyboardType="number-pad"
            textAlign="right"
            value={inputs.discPoint}
            blurOnSubmit={false}
            onChangeText={(e) => handleRequest("discPoint",e)}
            placeholder={"잔여 포인트, "+userSimpleInfo.point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +"원"}
            placeholderTextColor="#8F8F8F"
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity onPress={discount}
          style={{
            height: width * 0.08,
            marginLeft:5,
            backgroundColor: '#EFEFEF',
            borderRadius: 5,
            borderColor: 'rgba(124, 0, 0, 0.05)',
            borderWidth: 1,
            justifyContent:'center'
          }}>
            <Text
            style={{
              fontSize:9,
              fontWeight:'500',
              color:'black',
              textAlignVertical:'center'
            }}>할인적용</Text>
          </TouchableOpacity>
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
              {totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 주문하기</Text>
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
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10
  },
  Line: {
    paddingTop: 10,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#E7E7E7',
  },
  BigTitle: {
    color: 'black',
    fontFamily: 'Apple SD Gothic Neo',
    fontSize: 16,
    fontWeight: '800'
  },
  SmallTitle: {
    color: '#8F8F8F',
    fontFamily: 'Apple SD Gothic Neo',
    fontSize: 13,
    marginTop: 10,
    fontWeight: '500'
  }
})
export default OrderList;