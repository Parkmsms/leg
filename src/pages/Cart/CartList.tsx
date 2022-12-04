import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CartPost, getAccessToken } from "../../config/AxiosFunction";
import { initialStoreInfo, StoreInfo } from "../../models/storeInfo";
import { initialStoreMenu1, StoreMenu1 } from "../../models/storemenu";

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
}

type Item = {
  bigItemId: number;
  smallItemIds: number[];
  amount: number;
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
  const [cart, setCart] = useState<Cart>();
  const [request, setRequest] = useState<Item[]>([]);

  const postCart = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await CartPost(
      accessToken,
      route.params?.postId,
      request
    );
    setCart(response.data);
  }

  // useEffect(() => {
  //   request.push()
  //   setRequest([
  //     bigItemId: storeMenu.id,
  //     smallItemIds: radioButtons.map(radio => radio.id),
  //     amount: route.params?.amount
  //   ]);
  // }, [])

  useEffect(() => {
    console.log("가게정보", route.params?.storeInfo);
    console.log("가게ID", route.params?.postId);
    console.log("가게 프로필", route.params?.profile);
    console.log("메뉴", route.params?.menu);
    console.log("세부메뉴아이템 ", route.params?.smallItem);
    console.log("총개수", route.params?.amount);
    console.log("총가격", route.params?.price);

    //storeInfo 설정
    setStoreInfo(route.params?.storeInfo);
    //세부메뉴아이템 설정
    setRadioButtons(route.params?.smallItem);

    if (route.params?.menu) {
      setStoreMenu(route.params?.menu);
    }

    // postCart();

  }, [route]);

  return (
    <View style={CartWrapper.MainContainer}>

      <View style={{
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
        <Text
          style={{
            fontSize: 15,
            color: 'black',
            fontWeight: 'bold',
            paddingBottom: 15
          }}
        >{storeMenu.bigItem}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={{ uri: storeMenu.image }}
            style={{
              resizeMode: 'contain',
              borderRadius: 20,
              width: 70,
              height: 70
            }}
          />
          <View style={{ paddingLeft: 10 }}>
            <Text>가격: {storeMenu.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
            <Text>옵션: {radioButtons.map((radio => radio.description))}
              {radioButtons.map((radio) => radio.smallItem)}
            </Text>
            <Text style={{ paddingTop: 5, fontSize: 17, color: 'black' }}>{route.params?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
          </View>

        </View>

      </View>
      <View style={{ flex: 0.7, flexDirection: 'row', padding: 20, justifyContent: 'space-between' }}>
        <View style={{ height: 50, justifyContent: 'center', alignContent: 'center' }}>
          <Text style={{
            color: 'black', fontSize: 20, fontWeight: 'bold',
            alignSelf: 'center', alignItems: 'center', textAlign: 'center',
            justifyContent: 'center', alignContent: 'center'
          }}>가격</Text>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: '#00C1DE', borderRadius: 10, height: 50, width: 250, justifyContent: 'center', alignContent: 'center' }}>
          <Text style={{ fontSize: 20, color: 'white', alignSelf: 'center', alignItems: 'center', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>{route.params?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 결제하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const CartWrapper = StyleSheet.create({
  MainContainer: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
  },
})
export default CartList;