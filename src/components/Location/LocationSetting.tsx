import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from 'react-native-geolocation-service';
import axios from "axios";
import { getAccessToken, mylocation } from "../../config/AxiosFunction";
import BottomPopup from "../BottomPopUp";
import { gpsToAdress } from "../../config/KkaoAxiosFunction";

interface ILocation {
  latitude: number;
  longitude: number;
}

type LocationSetting = {
  navigation?: any;
  route: any;
}

type MyLocation = {
  locationId: number;
  userId: number;
  alias: string;
  isActive: boolean;
  address: {
    regionAddress: string;
    roadAddress: string;
    locationName: string;
    depth1: string;
    depth2: string;
    depth3: string;
    detail: string;
    lng: number;
    lat: number;
  }
};

const LocationSetting = ({ navigation, route }: LocationSetting) => {
  const [location, setLocation] = useState<ILocation>({
    latitude: 0,
    longitude: 0
  });
  const [myLocationList, setMyLocationList] = useState<MyLocation[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const MyLocationSetting = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await mylocation(accessToken);
    console.log("유저위치 목록반환:", response.data);
    setMyLocationList(response.data);

  }

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position.coords);

        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      error => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
      },
    )
    MyLocationSetting();
  }, [])

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  useEffect(() => {
    if (route.params?.registSucess) {
      openModal()
    }
  }, [])

  //현재 위치로 주소설정
  const currentAddress = (location: ILocation) => {
    console.log("현재위치로 주소 설정", location);
    if (location) {
      // 좌표로 주소변환 API
      gpsToAdress(String(location.longitude), String(location.latitude)).then((result) => {
        console.log("current", result.data.documents[0]);
        navigation.navigate('LocationVerify', { location: result.data.documents[0], gps: location })
      })
    }
  }

  return (
    <>
      <View style={LocationWrapper.MainContainer}>

        <View style={LocationWrapper.SearchContainer}>
          <Icon name='search-outline' size={20} color="black" />
          <TextInput
            onPressIn={() => navigation.navigate('LocationSearch')}
            // onKeyPress={() => navigation.navigate('LocationSearch')}
            placeholder="건물명, 도로명 또는 지번으로 검색" />
        </View>
        <View style={LocationWrapper.CureernLocationContinaer}>
          <Icon name='compass-outline' size={20} color="#00C1DE" />
          <Text style={LocationWrapper.current} onPress={e => currentAddress(location)}>현재 위치로 설정</Text>
        </View>
      </View>
      <View style={LocationWrapper.Horizon}></View>
      <View style={LocationWrapper.MyLocationContainer}>
        {myLocationList.length > 0 ?
          <FlatList
            data={myLocationList}
            renderItem={({ item }) =>
              <TouchableOpacity>
                <View style={LocationWrapper.MyLocationList}>
                  <View style={{ flexDirection: "column", justifyContent: 'center', alignItems: 'center', paddingRight: 20 }}>
                    {item.alias === "HOME" ?
                      <>
                        <MaterialCommunityIcon name='greenhouse' size={25} color="black" />
                        <Text style={{ color: 'black' }}>우리집</Text>
                      </>
                      :
                      <>
                        <MaterialCommunityIcon name='office-building-outline' size={25} color="black" />
                        <Text>회사</Text>
                      </>
                    }
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={{ color: '#000', fontWeight: 'bold' }}>{item.address.locationName}</Text>
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                      <Text style={LocationWrapper.AddressTypeContainer}>도로명</Text>
                      <Text style={{ color: '#000', paddingLeft: 10 }}>{item.address.roadAddress}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={LocationWrapper.AddressTypeContainer}>지번명</Text>
                      <Text style={{ color: '#000', paddingLeft: 10 }}>{item.address.regionAddress}</Text>
                    </View>
                  </View>
                </View>

              </TouchableOpacity>
            }
            keyExtractor={(item: MyLocation) => item.alias}
          /> :
          <View style={LocationWrapper.RecommandContainer}>
            <Text style={LocationWrapper.RecommandSearch}>아직 설정한 장소가 없습니다!</Text>
          </View>
        }

        {/* {myLocationList.length > 0 ?
        myLocationList.map((myLocation: MyLocation, index: number) =>
          <View key={index} style={LocationWrapper.RecommandContainer}>
            <Text>{myLocation.address.roadAddress}</Text>
            <Text>{myLocation.address.regionAddress}</Text>
          </View>
        )
        :
        <View style={LocationWrapper.RecommandContainer}>
          <Text style={LocationWrapper.RecommandSearch}>아직 설정한 장소가 없습니다!</Text>
        </View>
      } */}
      </View>

      <BottomPopup
        open={modalOpen}
        close={closeModal}
        header={"회원가입 완료!"}
        onTouchOutSide={closeModal}
      />
    </>
  )
}

const LocationWrapper = StyleSheet.create({
  MainContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  SearchContainer: {
    width: 300,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    borderRadius: 20
  },
  CureernLocationContinaer: {
    paddingTop: 10,
    width: 300,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  current: {
    color: '#00C1DE',
    fontSize: 15,
    fontWeight: '700'
  },
  Horizon: {
    width: '100%',
    textAlign: 'center',
    borderBottomColor: 'green',
    // borderBottomWidth: 1,
    lineHeight: 1,
    margin: 10
  },
  MyLocationContainer: {
    flex: 6,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 10,
    height: '100%',
    padding: 10,
    // paddingLeft: 50,
    backgroundColor: 'white',
  },
  MyLocationList: {
    flex: 1,
    // alignItems: 'center',
    // marginTop: 100,
    // marginVertical: 15,
    // marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    flexDirection: 'row',
    padding: 20,
  },
  AddressTypeContainer: {
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    width: 40,
    padding: 5,
    textAlign: 'center',
    borderRadius: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 10,
  },
  RecommandContainer: {
    flex: 7,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 50,
    paddingLeft: 50,
    backgroundColor: 'white',
  },
  RecommandSearch: {
    color: '#000000',
    fontFamily: 'Urbanist',
    fontSize: 20,
    fontWeight: 'bold'
  },
  exampleWrapper: {
    paddingTop: 10,
    paddingLeft: 30,
    justifyContent: 'center',
    textAlign: 'center',

  },
  form: {
    color: '#000000',
    fontWeight: 'bold',
  },
  example: {
    color: '#00C1DE',
    fontWeight: 'bold',
    paddingBottom: 20
  }
})
export default LocationSetting;