import CheckBox from "@react-native-community/checkbox";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getAccessToken, getStoreMenu2 } from "../../config/AxiosFunction";
import { initialStoreMenu1, StoreMenu1 } from "../../models/storemenu";

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
  smallItem: string;
  description: string;
  price: number;
  image: string;
  isExausted: boolean;
}

const DetailOptionPage = ({ navigation, route }: DetailOptionPageProps) => {
  const [storeMenu, setStoreMenu] = useState<StoreMenu1>(initialStoreMenu1);
  const [MenuOption, setMenuOption] = useState<StoreMenuDetail[]>([]);

  const getMenuOption = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await getStoreMenu2(accessToken, route.params?.storeId, route.params?.menu.id);
    console.log("메뉴세부선택: ", response.data);
    setMenuOption(response.data);

  }
  useEffect(() => {
    console.log("가게 ID", route.params?.storeId);

    if (route.params?.storeId && route.params?.menu) {
      getMenuOption()
      console.log("상위메뉴:", route.params?.menu);
      setStoreMenu(route.params?.menu)
    }
  }, [route])

  return (
    <View style={DetailOptionWrapper.MainContainer}>
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <View style={DetailOptionWrapper.MenuTitle}>
          <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{storeMenu.bigItem}</Text>
          <Text style={{ fontSize: 15, paddingTop: 10 }}>{storeMenu.description}</Text>
        </View>
        <View style={{ flex: 1, padding: 10 }}>
          <Image style={{ borderRadius: 30, height: 100, resizeMode: 'cover' }} source={{ uri: storeMenu.image ? storeMenu.image : 'null' }} />
        </View>
      </View>

      <View style={{
        flex: 0.1,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        width: '95%',
      }}></View>

      <View style={DetailOptionWrapper.MenuOption}>

        <ScrollView style={{ flexDirection: 'column' }}>
          {MenuOption.filter(option => option.checkLimit === -1).map((option: StoreMenuDetail, index: number) => {
            return (
              <View key={index}>
                <Text style={{ padding: 10, fontSize: 17, fontWeight: 'bold', color: 'black' }}>
                  {option.smallCategory}
                </Text>
                {option.smallItems.map((item, index) => {
                  return (
                    <View key={index} style={{ flexDirection: "row", alignItems: 'center', alignContent: 'center', padding: 10, justifyContent: 'space-between' }}>
                      <CheckBox />
                      <Text style={{ color: 'black' }}>{item.smallItem}</Text>
                      <Text style={{ color: 'black' }}>{item.description}</Text>
                      <Text style={{ color: 'black' }}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
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

      <View style={{ flex: 1, flexDirection: 'row', padding: 20, justifyContent: 'space-between' }}>
        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>수량</Text>
        <TouchableOpacity style={{ borderRadius: 50, borderWidth: 1, height: 50, width: 150, justifyContent: 'center', alignContent: 'center' }}>
          <Text style={{ alignSelf: 'center', alignItems: 'center', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>1개</Text>
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
  }
})
export default DetailOptionPage;