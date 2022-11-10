import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getAccessToken, getStoreMenu1 } from "../../config/AxiosFunction";

type DetailPageProps = {
  route: any;
  navigation?: any;
}
type StoreMenu = {
  nameId: number;
  name: string;
  description: string;
  checkLimit: number;
  items: StoreMenu1[];
}
type StoreMenu1 = {
  menuId: number;
  name: string;
  description: string;
  image: string;
  price: number;

}
const DetailPage = ({ navigation, route }: DetailPageProps) => {
  const [storeMenu, setStroeMenu] = useState<StoreMenu[]>([]);

  const getStoreMenu = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await getStoreMenu1(accessToken, route.params?.detailId);
    console.log(response.data);
    setStroeMenu(response.data)
  }
  const confirm = (item: StoreMenu1) => {
    console.log(item.image);
  }
  useEffect(() => {
    if (route.params?.detailId) {
      getStoreMenu()
    }
  }, [])

  return (
    <ScrollView style={DetailWrapper.MainContainer}>
      <View style={DetailWrapper.MenuHeaderWrapper}>
        <Text style={DetailWrapper.MenuHeader}>메뉴 🍽</Text>
      </View>
      <View style={DetailWrapper.MenuWrapper}>
        <ScrollView>
          {storeMenu?.map((menu1: StoreMenu, index: number) => {
            return (
              <View key={index}>
                {menu1.items.map((item: StoreMenu1, index: number) => {
                  return (
                    <TouchableOpacity key={index}
                      onPress={() => confirm(item)}
                      style={{
                        flexDirection: 'row',
                        borderWidth: 2,
                        borderRadius: 20,
                        // borderBottomColor: 'rgba(0, 0, 0, 0.12)',
                        marginBottom: 10,
                        width: 360,
                        height: 160,
                        borderColor: 'rgba(0, 0, 0, 0.05)',
                        paddingLeft: 10,
                        paddingTop: 20,
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
                        }}>{item.name}</Text>
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
    </ScrollView>

  )
}
const DetailWrapper = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
    // alignContent: 'center',
    // justifyContent: 'center',
    // padding: 10,
    paddingLeft: 10,
    // paddingRight: 10,
  },
  MenuHeaderWrapper: {
    width: 350,
    paddingTop: 10,
    flex: 4,
    flexDirection: "row",
    // justifyContent: 'space-between'
  },
  MenuHeader: {
    color: 'black',
    fontSize: 25,
    fontWeight: '800',
  },
  MenuWrapper: {
    flex: 1,
    backgroundColor: 'white',
    // alignContent: 'center',
    // padding: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
  }
})
export default DetailPage;