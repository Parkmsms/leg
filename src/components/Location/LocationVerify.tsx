import React, { useCallback, useEffect, useRef, useState } from "react"
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAccessToken, location } from "../../config/AxiosFunction";
import { initialKaKaoAddress, initialPostLocation, KaKaoAddress, PostLocation } from "../../models/locationInfo";
import BottomPopup from "../BottomPopUp";

type LocationVerify = {
  navigation?: any;
  route: any;
}

const LocationVerify = ({ navigation, route }: LocationVerify) => {
  const [address, setAddress] = useState<KaKaoAddress>(initialKaKaoAddress);
  const [homeAlias, setHomeAlias] = useState<boolean>(false);
  const [companyAlias, setCompanyAlias] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [data, setData] = useState<PostLocation>(initialPostLocation);

  useEffect(() => {
    setAddress({
      ...address,
      location: {
        road_address: route.params.location.road_address,
        address: route.params.location.address
      },
    })
  }, [])

  useEffect(() => {
    console.log("주소 확인", route.params?.location);
    console.log("위치 확인", route.params?.gps);
    console.log("건물 확인", route.params?.place);

  }, [])

  const setAlias = (key: string, e: any) => {
    console.log(e.currentTarget.value);

    console.log("key: ", key);

    if (key === 'home') {
      setHomeAlias(true);
      setCompanyAlias(false);
      setData({
        alias: 'HOME',
        isMarked: true,
        address: {
          regionAddress: address.location.address.address_name,
          roadAddress: address.location.road_address.address_name,
          // locationName: address.location.road_address.building_name,
          locationName: route.params?.place,
          depth1: address.location.address.region_1depth_name,
          depth2: address.location.address.region_2depth_name,
          depth3: address.location.address.region_3depth_name,
          detail: address.location.address.address_name,
          lng: route.params?.gps.longitude,
          lat: route.params?.gps.latitude
        }
      })
    }
    if (key === 'company') {
      setCompanyAlias(true);
      setHomeAlias(false);
      setData({
        alias: 'COMPANY',
        isMarked: true,
        address: {
          regionAddress: address.location.address.address_name,
          roadAddress: address.location.road_address.address_name,
          // locationName: address.location.road_address.building_name,
          locationName: route.params?.place,
          depth1: address.location.address.region_1depth_name,
          depth2: address.location.address.region_2depth_name,
          depth3: address.location.address.region_3depth_name,
          detail: address.location.address.address_name,
          lng: route.params?.gps.longitude,
          lat: route.params?.gps.latitude
        }
      })
    }
  }

  // const setLocation = () => {
  //   if (address.type == '도로명') {
  //     return address.location.road_address.address_name;
  //   } else {
  //     return address.location.address.address_name;
  //   }
  // }

  const saveLocation = async () => {
    console.log(data);
    const accessToken = await getAccessToken('accessToken');
    const response = await location(data, accessToken);
    console.log(response.data);
    try {
      openModal();
      navigation.navigate('LoginSucess');
    } catch (err) {
      console.log(err);
    }
  }

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }


  return (
    <>
      <View style={LocationVerifyWrapper.MainContainer}>
        <View style={LocationVerifyWrapper.PlaceContainer}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 20,
              paddingBottom: 20
            }}>{route.params?.place}</Text>
          </View>
          <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
            <Text style={LocationVerifyWrapper.TypeText}>도로명</Text>
            <Text style={LocationVerifyWrapper.LocationText}>{address.location.road_address.address_name}</Text>
          </View>
          <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
            <Text style={LocationVerifyWrapper.TypeText}>번지명</Text>
            <Text style={LocationVerifyWrapper.LocationText}>{address.location.address.address_name}</Text>
          </View>
        </View>
        <View style={LocationVerifyWrapper.AliasContainer}>
          <TouchableOpacity style={{
            backgroundColor: homeAlias === true ? '#87CEEB' : 'white',
            width: 100,
            height: 80,
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderRadius: 10,
            borderColor: 'rgba(0, 0, 0, 0.5)',
            shadowColor: '#52006A',
            borderWidth: 2,
            marginRight: 50
          }} onPress={e => setAlias('home', e)}>
            <Icon name='greenhouse' size={30} color="black" />
            <Text style={LocationVerifyWrapper.alias}>우리집</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: companyAlias === true ? '#87CEEB' : 'white',
            width: 100,
            height: 80,
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderRadius: 10,
            borderColor: 'rgba(0, 0, 0, 0.5)',
            shadowColor: '#52006A',
            borderWidth: 2,
          }} onPress={e => setAlias('company', e)}>
            <Icon name='office-building-outline' size={30} color="black" />
            <Text style={LocationVerifyWrapper.alias}>회사</Text>
          </TouchableOpacity>
        </View>
        <View style={LocationVerifyWrapper.buttonView}>
          <TouchableOpacity style={LocationVerifyWrapper.button} onPress={saveLocation}>
            <Text style={LocationVerifyWrapper.title} > 위치 설정</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomPopup
        open={modalOpen}
        close={closeModal}
        header={"위치설정 완료!"}
        onTouchOutSide={closeModal}
      />
    </>
  )
}

const LocationVerifyWrapper = StyleSheet.create({
  MainContainer: {
    flex: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  PlaceContainer: {
    flex: 1,
    paddingTop: 50,
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  TypeText: {
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 100,
    paddingTop: 5,
    textAlign: 'center',
    borderRadius: 10,
    fontWeight: 'bold'
  },
  LocationText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 10,
    // paddingBottom: 20,
  },
  AliasContainer: {
    flex: 4,
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10,
    paddingTop: 50,
  },
  home: {
    width: 100,
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 50
  },
  school: {
    width: 100,
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  alias: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 10
  },
  buttonView: {
    flex: 4,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100
  },
  button: {
    width: 325,
    height: 55,
    backgroundColor: '#00C1DE',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: 'white',
    fontSize: 20
  },
})
export default LocationVerify;