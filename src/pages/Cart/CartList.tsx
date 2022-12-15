import React, { ChangeEvent, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CartPost, getAccessToken } from "../../config/AxiosFunction";
import { initialStoreInfo, StoreInfo } from "../../models/storeInfo";
import { initialStoreMenu1, StoreMenu1 } from "../../models/storemenu";
import CheckBox from "@react-native-community/checkbox";
import { RoundedCheckbox, PureRoundedCheckbox } from "react-native-rounded-checkbox";
import Icon from "react-native-vector-icons/Entypo";

type CartListPageProps = {
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
const CartList = ({ navigation, route }: CartListPageProps) => {
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(initialStoreInfo);
  const [storeMenu, setStoreMenu] = useState<StoreMenu1>(initialStoreMenu1);
  const [radioButtons, setRadioButtons] = useState<StoreMenuOption[]>([]);
  const [cart, setCart] = useState<PostCart>();
  const [request, setRequest] = useState<Item[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checkList, setCheckList] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const postCart = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await CartPost(
      accessToken,
      route.params?.postId,
      request
    );
    // setCart(response.data);
  }

  // useEffect(() => {
  //   request.push()
  //   setRequest([
  //     bigItemId: storeMenu.id,
  //     smallItemIds: radioButtons.map(radio => radio.id),
  //     amount: route.params?.amount
  //   ]);
  // }, [])
  const allCheck = () => {

  }
  const onChecked = (id: number) => {
    console.log("선택한 ID", id);


    if (checkList.some((item: number) => item === id)) {
      console.log("제거");
      console.log(checkList.filter((item: number) => item !== id));
      // 선택한 id와 같지 않은것을 걸러내 
      setCheckList(checkList.filter((item: number) => item !== id));
      // setRadioButtons(radioButtons.filter((radio: StoreMenuOption) => radio.id !== id));
    } else {
      console.log("추가");
      setCheckList(checkList.concat(id));

      // setRadioButtons(radioButtons.concat(choose));
    }
  }
  const goOrder = () => {
    navigation.navigate('OrderList', {
      postId: route.params?.postId,
      itemSets: cart?.itemSets,
      totalPrice: totalPrice
    })
  }
  useEffect(() => {
    console.log("가게정보", route.params?.storeInfo);
    console.log("가게ID", route.params?.postId);
    // console.log("가게 프로필", route.params?.profile);
    console.log("메뉴", route.params?.menu);
    console.log("세부메뉴아이템 ", route.params?.smallItem);
    console.log("총개수", route.params?.amount);
    console.log("총가격", route.params?.price);

    //storeInfo 설정
    setStoreInfo(route.params?.storeInfo);
    // 대메뉴 설정
    setStoreMenu(route.params?.menu);
    //세부메뉴아이템 설정
    setRadioButtons(route.params?.smallItem);

    console.log(checkList.filter((check: number) => check === storeMenu.id));
    console.log(checkList.some((check) => check === storeMenu.id));



    // postCart();

  }, [checkList]);

  return (
    <View style={CartWrapper.MainContainer}>

      {/* <View style={{
        flex: 1,
        // justifyContent: 'flex-start',
        padding: 20,
        flexDirection: 'row',
      }}>
        <Image
          source={{ uri: route.params?.profile }}
          style={{
            resizeMode: 'contain',
            borderRadius: 20,
            width: 70,
            height: 70
          }}
        />
        <Text style={{
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          alignContent: 'center',
          padding: 20,
          fontSize: 15,
          color: 'black',
          fontWeight: 'bold'
        }}>{storeInfo.storeName}</Text>
      </View> */}
      <View style={CartWrapper.Horizon}>
        <CheckBox
          nativeID="all"
          style={{ margin: 1 }}
          onCheckColor="#00C1DE"
          disabled={false}
          onValueChange={allCheck}
          value={isAllChecked}
        // onChange={allAgreeHnalder} 
        />
        <Text style={{
          fontSize: 15, fontWeight: 'bold', color: 'black',
          fontFamily: 'Apple SD Gothic Neo'
        }}>
          전체 선택 ( {checkList.length} / {checkList.length} )</Text>
      </View>
      <View style={{
        flex: 0.1,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderColor: 'lightgray',
        width: '100%',
      }}></View>

      <View style={{
        flex: 5,
        flexDirection: 'column',
        padding: 20
      }}>

        <View style={{
          flexDirection: 'row'
        }}>
          {/* <CheckBox
            nativeID=""
            onCheckColor="#00C1DE"
            style={{margin: 1}}
            disabled={false}
            onValueChange={(e: any) => setEventCheckBox(e)}
            value={storeMenu.id}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAgreeHandler(e)}
          /> */}

          <View style={{
            justifyContent: 'center',
            alignContent: 'center',
            paddingRight: 20
          }}>
            <CheckBox
              // nativeID="all"
              style={{ margin: 1, paddingRight: 20 }}
              onCheckColor="#00C1DE"
              disabled={false}
              onValueChange={() => onChecked(storeMenu.id)}
              value={checkList.some((check: number) => check === storeMenu.id) ? true : false}
            // onChange={() => onChecked(storeMenu.id)}
            />
          </View>

          {/* <RoundedCheckbox
                        onPress={() => onChecked(storeMenu.id)}
                        isChecked={false}
                        checkedColor={checkList.filter((check: number) => check === storeMenu.id) ? "#00C1DE" : "transparent"}
                      >
                        <Icon
                          size={15}
                          name="check"
                          color={checkList.filter((check: number) => check === storeMenu.id) ? "#fdfdfd" : "transparent"}
                        />
                      </RoundedCheckbox> */}

          <Image
            source={{ uri: storeMenu.image ? storeMenu.image : 'null' }}
            style={{
              resizeMode: 'contain',
              borderRadius: 20,
              width: 100,
              height: 80
            }}
          ></Image>

          <View style={{ paddingLeft: 20 }}>
            <Text
              style={{
                fontSize: 15,
                color: 'black',
                fontWeight: 'bold',
              }}
            >{storeMenu.bigItem}</Text>
            {/* <Text>가격: {storeMenu.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text> */}
            <Text style={{ paddingTop: 5, fontSize: 15, color: 'gray' }}
            >옵션: {radioButtons.map((radio => radio.description))}
              {radioButtons.map((radio) => radio.smallItem)}
            </Text>
            <Text style={{ paddingTop: 5, fontSize: 20, color: 'black' }}>{route.params?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
          </View>

          <View style={{
            justifyContent: 'center',
            alignContent: 'center',
            paddingLeft: 20
          }}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold',
                justifyContent: 'center',
                alignContent: 'center'
              }}>{route.params?.amount}개</Text>
          </View>


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
            <Text style={{ paddingBottom: 5, fontSize: 15, fontWeight: 'bold' }}>상품금액: {route.params?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>할인금액: 0원</Text>
          </View>
          <View style={{
            paddingLeft: 70,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
          }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>결제 예상: </Text>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#00C1DE' }}>{route.params?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
          </View>
        </View>

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
          <Text style={{ fontWeight: '700', fontFamily: 'Urbanist', fontSize: 20, color: 'white', alignSelf: 'center', alignItems: 'center', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>{route.params?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 주문하기</Text>
        </TouchableOpacity>
      </View>
    </View >
  )
}
const CartWrapper = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
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
  }
})
export default CartList;