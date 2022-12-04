import React, { useCallback, useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
import axios from "axios";
import BottomPopup from "../../components/Modal/BottomPopUp";
import { gpsToAdress, keywordToAdress } from "../../config/KkaoAxiosFunction";

interface ILocation {
  latitude: number;
  longitude: number;
}

type LocationSearch = {
  navigation?: any,
  route: any
}

interface ILocationList {
  place_name: string;
  distance: string;
  place_url: string;
  category_name: string;
  address_name: string;
  road_address_name: string;
  id: string;
  phone: string;
  category_group_code: string;
  category_group_name: string;
  x: string;
  y: string;
}

const LocationSearch = ({ navigation, route }: LocationSearch) => {
  const [input, setInput] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [location, setLocation] = useState<ILocation>({
    latitude: 0,
    longitude: 0
  });

  const [locationList, setLocationList] = useState<ILocationList[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);

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
  }, [])

  //현재 위치로 주소설정
  const currentAddress = (location: ILocation) => {
    console.log("현재위치로 주소 설정", location);
    if (location) {
      // 좌표로 주소변환 API
      gpsToAdress(String(location.longitude), String(location.latitude)).then((result) => {
        console.log("좌표로 주소변환 API 검색한 결과", result.data.documents[0]);

        //만약 도로명이 null 인경우 
        if (result.data.documents[0].road_address === null) {
          // 키워드로 주소 검색 API 
          keywordToAdress(result.data.documents[0].address.address_name).then((result) => {
            // console.log(result.data.documents);
            console.log("키워드로 주소검색 API 결과", result.data.documents);
            setLocationList(result.data.documents);
          })
        } else {
          console.log("좌표로 주소변환 API 검색한 결과", result.data.documents[0]);
          navigation.navigate('LocationVerify', { location: result.data.documents[0], gps: location });
        }

      })
    }
  }

  const onPress = useCallback((e: { nativeEvent: { text: string; }; }) => {
    const { text } = e.nativeEvent;
    console.log(e.nativeEvent);
    console.log(typeof (text));
    console.log(text.length);

    if (text) {
      //키워드로 주소검색 API
      keywordToAdress(text).then((result) => {
        // console.log(result.data.documents);
        console.log("키워드로 주소검색 API 결과", result.data.documents);
        setLocationList(result.data.documents);
      })
    } else {
      setLocationList([]);
    }


  }, [input]);

  useEffect(() => {
    console.log(locationList.length);

    if (location)
      console.log("현재위치", location);
    setIsActive(true)
    console.log("좌표로 주소검색 후 받은 결과 길이", locationList.length);

  }, [locationList, location])

  const renderItem = (item: ILocationList) => {
    return (
      <View style={LocationWrapper.RecommandContainer}>
        <Text>{item.address_name}</Text>
      </View>
    )
  }

  const getGps = (x: string, y: string, place: string) => {
    console.log("키워드로 주소검색한 위치", x, y);

    const SearchLocationGps: ILocation = { longitude: parseFloat(x), latitude: parseFloat(y) }

    //좌표로 주소변환
    gpsToAdress(x, y).then((result) => {
      console.log("현재 위치", result.data.documents[0]);
      navigation.navigate('LocationVerify', { location: result.data.documents[0], gps: SearchLocationGps, place: place })
    })

  }

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

  return (
    <>
      <View style={LocationWrapper.MainContainer}>

        <View style={LocationWrapper.SearchContainer}>
          <Icon name='search-outline' size={20} color="black" />
          <TextInput
            // multiline 불가능
            // enter 키 터치시 키보드가 hide 되지 않음
            multiline={false}
            // style={isActive ? LocationWrapper.textFocus : null}
            // onKeyPress={ }
            // clearTextOnFocus={true}
            // onPressIn={() => setIsActive(false)}
            // onBlur={() => setIsActive(false)}
            blurOnSubmit={false}
            onSubmitEditing={onPress}
            placeholder="도로명, 지번 또는 건물명으로 검색"
          // onChangeText={value => onPress(value)} 
          />
        </View>
        <View style={LocationWrapper.CureernLocationContinaer}>
          <Icon name='compass-outline' size={20} color="#00C1DE" />
          <Text style={LocationWrapper.current} onPress={e => currentAddress(location)}>현재 위치로 설정</Text>
        </View>
      </View>
      <View style={LocationWrapper.Horizon}></View>
      {locationList.length > 0 ?
        // locationList.map((locationList: ILocationList, index: number) =>
        //   <View key={index} style={LocationWrapper.RecommandContainer}>
        //     <Text style={LocationWrapper.RecommandSearch}>{locationList.address_name}</Text>
        //   </View>
        // )
        <View style={LocationWrapper.SearchListContainer}>
          <FlatList
            data={locationList}
            renderItem={({ item }) =>
              <TouchableOpacity
                onPress={() => getGps(item.x, item.y, item.place_name)}
              >
                <View style={LocationWrapper.SearchViewContainer}>
                  <Text style={{ color: '#000', fontWeight: 'bold' }}>{item.place_name}</Text>
                  <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                    <Text style={LocationWrapper.AddressTypeContainer}>도로명</Text>
                    <Text style={{ color: '#000', paddingLeft: 10 }}>{item.road_address_name}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={LocationWrapper.AddressTypeContainer}>지번명</Text>
                    <Text style={{ color: '#000', paddingLeft: 10 }}>{item.address_name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            }
            keyExtractor={(item: ILocationList) => item.id}
          // windowSize={2}
          />
        </View>

        :
        <View style={LocationWrapper.RecommandContainer}>
          <Text style={LocationWrapper.RecommandSearch}>이렇게 검색해보세요🔎</Text>

          <View style={LocationWrapper.exampleWrapper}>
            <Text style={LocationWrapper.form}>도로명 + 건물번호</Text>
            <Text style={LocationWrapper.example}>ex. 서초로 38길 12</Text>

            <Text style={LocationWrapper.form}>지역명(동/리) + 번지</Text>
            <Text style={LocationWrapper.example}>ex. 서초로 1498-5</Text>

            <Text style={LocationWrapper.form}>지역명(동/리) + 건물명(아파트명)</Text>
            <Text style={LocationWrapper.example}>ex. 서초동 렛잇고빌딩</Text>
          </View>

        </View>
      }
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
  // textFocus: {
  //   // backgroundColor: 'black',
  //   borderColor: "black",
  // },
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
  SearchListContainer: {
    flex: 6,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 10,
    height: '100%',
    padding: 10,
    // paddingLeft: 50,
    backgroundColor: 'white',
  },
  SearchViewContainer: {
    flex: 1,
    // alignItems: 'center',
    // marginTop: 100,
    // marginVertical: 15,
    // marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    flexDirection: 'column',
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
    flex: 4,
    // height: 30,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 20,
    // paddingLeft: 50,
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
    // paddingLeft: 30,
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
export default LocationSearch;