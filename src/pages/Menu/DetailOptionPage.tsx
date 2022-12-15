import CheckBox from "@react-native-community/checkbox";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getAccessToken, getStoreMenu2 } from "../../config/AxiosFunction";
import { initialStoreMenu1, StoreMenu1 } from "../../models/storemenu";
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { RoundedCheckbox, PureRoundedCheckbox } from "react-native-rounded-checkbox";
import Icon from "react-native-vector-icons/Entypo";
import AntIcon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const DetailOptionPage = ({ navigation, route }: DetailOptionPageProps) => {
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
  // const initialMenuOpiton: StoreMenuOption[] = {
  //   return MenuOption.forEach((element) => { element.smallItems });
  // }
  // const radioButtonsData: RadioButtonProps[] = initialMenuOpiton();



  const getMenuOption = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await getStoreMenu2(accessToken, route.params?.storeId, route.params?.menu.id);
    console.log("메뉴세부선택: ", response.data);
    setMenuOption(response.data);

  }
  // const onPressRadioButton = (radioButtonsArray: RadioButtonProps[]) => {
  //   console.log("선택", radioButtonsArray[0].id);
  //   console.log("radioButtons", radioButtons.some((radio) => console.log("뭐지", radio)));

  //   // if(radioButtons.some((radio: StoreMenuOption) => radio === radioButtonsArray.map(selected => selected.id)))

  //   if (radioButtons.some((radio) => radio.id === radioButtonsArray[0].id)) {
  //     console.log("선택한것만 남고 나머지 제거");
  //     setRadioButtons(radioButtons.filter((radio) => radio.id !== radioButtonsArray[0].id))
  //   } else {
  //     console.log("추가");
  //     const id = radioButtonsArray[0].id;
  //     setRadioButtons(radioButtonsArray);
  //   }
  //   // setRadioButtons()
  //   // setRadioButtons(radioButtonsArray)
  // }

  const onChecked = (choose: StoreMenuOption) => {
    console.log("선택한 ID", choose.id);


    if (checkList.some((item: number) => item === choose.id)) {
      console.log("제거");
      console.log(checkList.filter((item: number) => item !== choose.id));
      // 선택한 id와 같지 않은것을 걸러내 
      setCheckList(checkList.filter((item: number) => item !== choose.id));
      setRadioButtons(radioButtons.filter((radio: StoreMenuOption) => radio.id !== choose.id));
    } else {
      console.log("추가");
      setCheckList(checkList.concat(choose.id));
      setRadioButtons(radioButtons.concat(choose));
    }
  }

  useEffect(() => {
    console.log("가게 정보", route.params?.storeInfo);
    console.log("가게 프로필", route.params?.profile);
    console.log("가게 ID", route.params?.storeId);
    console.log("radioButtons", radioButtons);
    // const sum :number = radioButtons.reduce((stack:StoreMenuOption, el:StoreMenuOption)=> {
    //   return stack.price + el.price;
    // }, 0)
    // setTotalPrice(sum);
    if (radioButtons.length !== 0) {
      for (let i = 0; i < radioButtons.length; i++) {
        console.log("옵션가격", radioButtons[i].price);
        sum = (storeMenu.price + radioButtons[i].price) * totalAmount;
        console.log("sum", sum);
        setTotalPrice(sum);
      }
    } else if (radioButtons.length == 0) {
      sum = storeMenu.price;
      setTotalPrice(sum);
    }



    console.log(checkList);


    if (route.params?.storeId && route.params?.menu) {
      getMenuOption()
      console.log("상위메뉴:", route.params?.menu);
      setStoreMenu(route.params?.menu)
    }
  }, [route, radioButtons, sum, totalAmount, storeMenu])

  useEffect(() => {
    if (MenuOption[0]) {
      console.log("첫번째 id", MenuOption[0].smallItems[0].id);
      setCheckList(checkList.concat(MenuOption[0].smallItems[0].id));
    }

  }, [MenuOption])
  // useEffect(() => {
  //   setCheckList(checkList.concat(MenuOption[0].smallItems[0].id));
  // }, [MenuOption])

  // useEffect(() => {
  //   MenuOption.map((small) => small.smallItems.forEach((element) => {
  //     arr = arr.concat(element)
  //   }))
  //   console.log("smallItems", arr);
  // }, [MenuOption, arr])

  // useEffect(() => {
  //   MenuOption.map((small) =>
  //     setRadioButtons(small.smallItems)
  //   )
  //   console.log("smallItems", radioButtons);
  // }, [MenuOption])

  const goBack = async () => {
    navigation.goBack();
    await AsyncStorage.setItem('storeInfo', JSON.stringify(route.params?.storeInfo));
    await AsyncStorage.setItem('storeId', JSON.stringify(route.params?.storeId));
    await AsyncStorage.setItem('profile', JSON.stringify(route.params?.profile));
    await AsyncStorage.setItem('menu', JSON.stringify(route.params?.menu));
    await AsyncStorage.setItem('smallItem', JSON.stringify(radioButtons));
    await AsyncStorage.setItem('totalAmount', JSON.stringify(totalAmount));
    await AsyncStorage.setItem('totalPrice', JSON.stringify(totalPrice));

    // navigation.navigate('CartList', {
    //   storeInfo: route.params?.storeInfo,
    //   postId: route.params?.storeId,
    //   profile: route.params?.profile,
    //   menu: route.params?.menu,
    //   smallItem: radioButtons,
    //   amount: totalAmount,
    //   price: totalPrice
    // })
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

      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <View style={DetailOptionWrapper.MenuTitle}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{storeMenu.bigItem}</Text>
            <Text style={{ fontSize: 15, paddingTop: 10 }}>
              {toggleEllipsis(storeMenu.description, contentLimit).string}
              <View style={{
                justifyContent: "center",
                alignItems: "center",
              }}>
                <TouchableOpacity
                  onPress={() => onClickMore(storeMenu.description)}>
                  {toggleEllipsis(storeMenu.description, contentLimit).isShowMore
                    &&
                    <Text style={{ margin: -10 }}>... 더보기</Text>
                  }
                </TouchableOpacity>
              </View>
            </Text>
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <Image style={{ borderRadius: 30, height: 100, resizeMode: 'cover' }} source={{ uri: storeMenu.image ? storeMenu.image : 'null' }} />
          </View>
        </View>

        <View style={{
          flexDirection: 'row',
          paddingLeft: 20,
          paddingRight: 20,
          justifyContent: 'space-between'
        }}>
          <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>가격</Text>
          <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
          {/* <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{storeMenu.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text> */}
        </View>

        <View style={{ flexDirection: 'row', padding: 20, justifyContent: 'space-between' }}>
          <View style={{ height: 50, justifyContent: 'center', alignContent: 'center' }}>
            <Text style={{
              color: 'black', fontSize: 20, fontWeight: 'bold',
              alignSelf: 'center', alignItems: 'center', textAlign: 'center',
              justifyContent: 'center', alignContent: 'center'
            }}>수량</Text>
          </View>
          <View style={{
            flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignSelf: 'center', alignItems: 'center', alignContent: 'center'
          }}>
            <TouchableOpacity
              onPress={minusAmount}
              disabled={totalAmount === 1 ? true : false}>
              <AntIcon name="minuscircleo" size={20} style={{ color: '#00C1DE' }} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, color: 'black', padding: 10 }}>
              {totalAmount}
            </Text>
            <TouchableOpacity
              onPress={plusAmount}>
              <AntIcon name="pluscircleo" size={20} style={{ color: '#00C1DE' }} />
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity
            style={{ borderWidth: 1, borderRadius: 50, height: 50, width: 200, justifyContent: 'center', alignContent: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <TouchableOpacity
                onPress={minusAmount}
                disabled={totalAmount === 1 ? true : false}
              ><Text style={{ fontSize: 30, color: totalAmount === 1 ? 'blue' : 'black' }}>-</Text></TouchableOpacity>
              <Text style={{ fontSize: 15, color: 'black', alignSelf: 'center', alignItems: 'center', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>
                {totalAmount}
              </Text>
              <TouchableOpacity>
                <Text onPress={plusAmount}
                  style={{ fontSize: 30 }}>+</Text>
              </TouchableOpacity>

            </View>

          </TouchableOpacity> */}
        </View>
      </View>


      <View style={{
        flex: 0.1,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        width: '100%',
      }}></View>

      <View style={DetailOptionWrapper.MenuOption}>
        <ScrollView style={{ flexDirection: 'column' }}>
          {MenuOption.filter(option => option.checkLimit === -1).map((option: StoreMenuDetail, index: number) => {
            return (
              <View key={index}>
                <Text style={{ padding: 10, fontSize: 17, fontWeight: 'bold', color: 'black' }}>
                  {option.smallCategory} (한개만 선택해주세요!)
                </Text>

                {option.smallItems.map((item: StoreMenuOption, index) => {
                  return (
                    <View key={index} style={{
                      flexDirection: "row",
                      alignItems: 'center',
                      alignContent: 'center',
                      padding: 10,
                      // justifyContent: 'space-between',
                    }}>
                      {/* <RadioGroup
                        radioButtons={[item]}
                        onPress={onPressRadioButton}
                      /> */}
                      <RoundedCheckbox
                        onPress={() => onChecked(item)}
                        isChecked={false}
                        checkedColor={checkList.filter((check: number) => check === item.id) ? "#00C1DE" : "transparent"}
                      >
                        <Icon
                          size={15}
                          name="check"
                          color={checkList.filter((check: number) => check === item.id) ? "#fdfdfd" : "transparent"}
                        />
                      </RoundedCheckbox>
                      <Text style={{ paddingLeft: 50, color: 'black', textAlign: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>{item.smallItem}</Text>
                      <Text style={{ paddingLeft: 50, color: 'black', textAlign: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>{item.description}</Text>
                      <Text style={{ paddingLeft: 50, color: 'black' }}>{item.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
                    </View>
                  )
                })}
              </View>
            )
          })}
          {/* <Text>{MenuOption.filter(option => option.checkLimit === 1).map(option => option.items.length)}</Text> */}
          {/* <Text>
            {MenuOption.filter(option =>
              option.checkLimit === 1).map(option => option.items.map(item => item.name))}
          </Text> */}


        </ScrollView>
        <View style={{
          flex: 0.5,
          borderStyle: 'solid',
          borderBottomWidth: 1,
          borderColor: 'lightgray',
          width: '100%',
        }}></View>
      </View>

      <View style={DetailOptionWrapper.footer}>
        {/* <View style={{ height: 50, paddingLeft: 20, justifyContent: 'center', alignContent: 'center' }}>
          <Text style={{
            color: 'black', fontSize: 20, fontWeight: 'bold',
            alignSelf: 'center', alignItems: 'center', textAlign: 'center'
          }}>가격</Text>
        </View>
        <TouchableOpacity onPress={goCart}
          style={{ backgroundColor: '#00C1DE', borderRadius: 10, height: 50, width: 250, justifyContent: 'center', alignContent: 'center' }}>
          <Text style={{ fontSize: 20, color: 'white', alignSelf: 'center', alignItems: 'center', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>
          {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 담기
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={goBack}
          style={{ backgroundColor: '#00C1DE', borderRadius: 10, height: 50, width: 350, justifyContent: 'center', alignContent: 'center' }}>
          <Text style={{ fontSize: 20, color: 'white', alignSelf: 'center', alignItems: 'center', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>포장 카트에 담기</Text>
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
    padding: 20,
    flexDirection: 'column'
  },
  MenuOption: {
    flex: 4,
    padding: 10
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignContent: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  }
})
export default DetailOptionPage;