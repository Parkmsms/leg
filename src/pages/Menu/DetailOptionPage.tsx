import CheckBox from "@react-native-community/checkbox";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Alert } from "react-native";
import { getAccessToken, getSmallMenu } from "../../config/AxiosFunction";
import { initialStoreMenu1, StoreMenu1 } from "../../models/storemenu";
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { RoundedCheckbox, PureRoundedCheckbox } from "react-native-rounded-checkbox";
import Icon from "react-native-vector-icons/Entypo";
import AntIcon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RadioButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItemList,
  pushCartList,
} from '../../slices/item';

type DetailOptionPageProps = {
  route: any;
  navigation?: any;
}

type StoreMenuDetail = {
  id: number;
  smallCategory: string;
  checkLimit: number;
  smallItems: StoreMenuOption[];
}
type StoreMenuOption = {
  id: number;
  smallItem?: string;
  description?: string;
  price: number;
  image?: string;
  isExausted?: boolean;
}
const width = Dimensions.get('window').width;

const DetailOptionPage = ({ navigation, route }: DetailOptionPageProps) => {
  const dispatch = useDispatch();
  const cartItemList = useSelector(selectCartItemList);
  const [storeMenu, setStoreMenu] = useState<StoreMenu1>(initialStoreMenu1);
  const [MenuOption, setMenuOption] = useState<StoreMenuDetail[]>([]);
  // const [detailMenu, setDetailMenu] = useState<StoreMenuOption[]>([]);
  const [checkList, setCheckList] = useState<number[]>([]);
  const [cartList, setCartList] = useState<number[]>([]);
  let arr: StoreMenuOption[] = [];
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(1);
  const [contentLimit, setContentlimit] = useState<number>(20);
  let sum = 0;
  const [radioButtons, setRadioButtons] = useState<StoreMenuOption[]>([]);
  const [checked, setChecked] = React.useState('first');
  const [checked2, setChecked2] = React.useState<any>();
  // const initialMenuOpiton: StoreMenuOption[] = {
  //   return MenuOption.forEach((element) => { element.smallItems });
  // }
  // const radioButtonsData: RadioButtonProps[] = initialMenuOpiton();


  const getMenuOption = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await getSmallMenu(accessToken, route.params?.storeId, route.params?.menu.id);
    console.log("메뉴세부선택: ", response.data);
    setMenuOption(response.data);

  }

  const onChecked = (choose: StoreMenuOption) => {
    if (checkList.some((item: number) => item === choose.id)) {
      console.log(checkList.filter((item: number) => item !== choose.id));
      // 선택한 id와 같지 않은것을 걸러내 
      setCheckList(checkList.filter((item: number) => item !== choose.id));
      setRadioButtons(radioButtons.filter((radio: StoreMenuOption) => radio.id !== choose.id));
    } else {
      setCheckList(checkList.concat(choose.id));
      setRadioButtons(radioButtons.concat(choose));
    }
  }

  useEffect(() => {
    // const sum :number = radioButtons.reduce((stack:StoreMenuOption, el:StoreMenuOption)=> {
    //   return stack.price + el.price;
    // }, 0)
    // setTotalPrice(sum);
    if (radioButtons.length !== 0) {
      for (let i = 0; i < radioButtons.length; i++) {
        console.log("옵션정보", radioButtons[i]);
        sum = (storeMenu.price + radioButtons[i].price) * totalAmount;
        setTotalPrice(sum);
      }
    } else if (radioButtons.length == 0) {
      sum = storeMenu.price;
      setTotalPrice(sum);
    }

    if (route.params?.storeId && route.params?.menu) {
      getMenuOption()
      setStoreMenu(route.params?.menu)
    }
    console.log("이후", checkList);
    if (checkList.length >= 1) {
      checkList.shift();
      setCheckList(checkList);
    }
  }, [route, radioButtons, sum, totalAmount, storeMenu])



  const setCart = () => {

    console.log("카트에 담는 radioButtons", radioButtons);
    const testParam = {
      'storeId': route.params?.storeId,
      'storeNm': route.params?.storeInfo.storeName,
      'bigItem': route.params?.menu.bigItem,
      'itemSize': radioButtons[0]?.smallItem,
      'description': route.params?.menu.description,
      'id': route.params?.menu.id,
      'image': route.params?.menu.image,
      'isExhausted': route.params?.menu.isExhausted,
      'totalAmount': totalAmount,
      'price': totalPrice
    }

    dispatch(pushCartList(testParam));
  }
  const goBack = () => {
    if (MenuOption.length !== 0 && checked2 === undefined) {
      Alert.alert("옵션을 선택해주세요")
    }
    else {
      if (cartItemList.length >= 1 && !cartItemList.map((item: any) => item.storeId).includes(route.params?.storeId)) {
        console.log("다른상점임 ..")
        Alert.alert("같은 상점의 상품만 카트에 담을 수 있습니다.")
      }
      // else if (cartItemList.map((item: any) => item.id).includes(route.params?.menu.id)) {
      //   Alert.alert("중복담기 불가능합니다!", route.params?.menu.bigItem)
      // } 
      else {
        setCart();
        navigation.goBack();
      }
    }
  }
  const minusAmount = () => {
    setTotalAmount(totalAmount - 1);
  }
  const plusAmount = () => {
    setTotalAmount(totalAmount + 1);
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
  return (
    <View style={DetailOptionWrapper.MainContainer}>
      <View style={DetailOptionWrapper.SubWrap}>
        <View style={{ flexDirection: 'row', }}>
          <View style={DetailOptionWrapper.MenuTitle}>
            <Text style={[DetailOptionWrapper.textFont, { color: '#000000', fontWeight: 'bold', fontSize: 16 }]}>{storeMenu.bigItem}</Text>
            <Text style={[DetailOptionWrapper.textFont, { fontSize: 11, marginTop: 10 }]}
              numberOfLines={3}
              ellipsizeMode="tail"
            // onPress={handleLine}
            >
              {storeMenu.description}
            </Text>
          </View>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20
        }}>
          <Text style={DetailOptionWrapper.bigFont}>가격</Text>
          <Text style={[DetailOptionWrapper.bigFont, { color: '#667085' }]}>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
          {/* <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{storeMenu.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text> */}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ height: 50, justifyContent: 'center', alignContent: 'center' }}>
            <Text style={DetailOptionWrapper.bigFont}>수량</Text>
          </View>
          <View style={{
            flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignSelf: 'center', alignItems: 'center', alignContent: 'center'
          }}>
            <TouchableOpacity
              onPress={minusAmount}
              disabled={totalAmount === 1 ? true : false}>
              <AntIcon name="minuscircleo" size={20} style={{ color: '#00C1DE' }} />
            </TouchableOpacity>
            <Text style={[DetailOptionWrapper.bigFont, { marginLeft: 10, marginRight: 10 }]}>
              {totalAmount}
            </Text>
            <TouchableOpacity
              onPress={plusAmount}>
              <AntIcon name="pluscircleo" size={20} style={{ color: '#00C1DE' }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{
        backgroundColor: 'rgba(0, 193, 222, 0.12);', width: width, height: 45, flexDirection: 'row',
        position: 'relative', padding: 14, justifyContent: 'center'
      }}>
        <Text style={{ flex: 5, color: '#3E3E3E', fontSize: 12, fontFamily: 'Urbanist', fontWeight: 'bold' }}>일회용품 선택</Text>
        <Text style={{ flex: 1, color: '#00C1DE', fontSize: 11, fontWeight: 'bold' }}>필수 선택</Text>
      </View>
      {/* 일회용품선택 */}
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        alignContent: 'center',
        paddingLeft: 25,
        paddingRight: 25
      }}>
        <View style={{ flex: 5 }}>
          <Text>O</Text>
        </View>
        <View style={{ flex: 1 }}>
          <RadioButton.Item
            label=""
            value="first"
            color="#00C1DE"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('first')}
          />
        </View>
      </View>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        alignContent: 'center',
        paddingLeft: 25,
        paddingRight: 25
      }}>
        <View style={{ flex: 5 }}>
          <Text>X</Text>
        </View>
        <View style={{ flex: 1 }}>
          <RadioButton.Item
            label=""
            value="second"
            color="#00C1DE"
            status={checked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('second')}
          />
        </View>
      </View>


      <View style={DetailOptionWrapper.MenuOption}>
        <ScrollView style={{ flexDirection: 'column' }}>
          {MenuOption.filter(option => option.checkLimit === -1).map((option: StoreMenuDetail, index: number) => {
            return (
              <View key={index}>
                <Text style={[DetailOptionWrapper.textFont, { color: '#000000', fontWeight: 'bold', fontSize: 16 }]}>
                  {option.smallCategory}
                </Text>
                {option.smallItems.map((item: StoreMenuOption, index) => {
                  return (
                    <View key={index} style={{
                      flexDirection: "row",
                      alignItems: 'center',
                      alignContent: 'center',
                      paddingLeft: 10,
                      paddingRight: 10
                    }}>
                      <View style={{ flex: 5, flexDirection: 'row' }}>
                        <Text style={{ color: 'black' }}>{item.smallItem}</Text>
                        {/* <Text style={{ paddingLeft: 50, color: 'black', textAlign: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>{item.description}</Text> */}
                        <Text style={{ color: 'black', }}>({item.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원)</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <RadioButton.Item
                          label=""
                          value="dd"
                          color="#00C1DE"
                          status={checked2 === item.id ? 'checked' : 'unchecked'}
                          onPress={() => {
                            onChecked(item);
                            setChecked2(item.id)
                          }
                          }
                        />
                      </View>
                    </View>
                  )
                })}
              </View>
            )
          })}
        </ScrollView>
      </View>
      <View style={DetailOptionWrapper.footer}>
        <TouchableOpacity onPress={goBack}
          style={DetailOptionWrapper.ActivateButton}>
          <Text style={DetailOptionWrapper.ButtonText}>포장 카트에 담기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const DetailOptionWrapper = StyleSheet.create({
  MainContainer: {
    display: 'flex',
    flex: 4,
    backgroundColor: 'white',
  },
  MenuTitle: {
    flex: 1,
    flexDirection: 'column'
  },
  MenuOption: {
    flex: 4,
    padding: 14
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignContent: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  ButtonText: {
    fontSize: 20,
    fontFamily: 'Urbanist',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#FFFFFF',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  ActivateButton: {
    backgroundColor: '#00C1DE',
    borderRadius: 12,
    height: 54,
    justifyContent: 'center',
    alignContent: 'center',
    width: width * 0.8
  },
  textFont: {
    fontFamily: 'Urbanist',
    fontStyle: 'normal',
    color: '#828282'
  },
  bigFont: {
    fontFamily: 'Urbanist',
    fontStyle: 'normal',
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16
  },
  SubWrap: {
    flexDirection: 'column',
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 20
  }
})
export default DetailOptionPage;