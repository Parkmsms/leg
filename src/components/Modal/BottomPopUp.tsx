import React, { useEffect, useState } from "react"
import { Modal, Text, View, Dimensions, TouchableWithoutFeedback, SafeAreaView, Button, TouchableOpacity } from "react-native";
import NaverMapView, { Circle, Marker, Path, Polyline, Polygon } from "react-native-nmap";
type BottomPopupProps = {
  open: boolean;
  close: any;
  header?: string;
  kind?: string;
  onTouchOutSide: any;
}

const BottomPopup = (props: BottomPopupProps) => {
  const { open, close, header, onTouchOutSide, kind } = props;

  const [isShow, setIsShow] = useState<boolean>(false);
  const deviceHeight = Dimensions.get("window").height;

  const outsideTouchable = (onTouchOutSide: any) => {
    const view = <View style={{ flex: 1, width: '100%' }} />
    if (!onTouchOutSide)
      return view
    else {
      return (
        <TouchableWithoutFeedback onPress={onTouchOutSide}
          style={{ flex: 1, width: '100%' }}>
          {view}
        </TouchableWithoutFeedback>
      )
    }
  }


  const MyMap = () => {
    const P0 = { latitude: 37.564362, longitude: 126.977011 };
    const P1 = { latitude: 37.565051, longitude: 126.978567 };
    const P2 = { latitude: 37.565383, longitude: 126.976292 };

    return (
      <NaverMapView style={{ width: '100%', height: '100%' }}
        showsMyLocationButton={true}
        center={{ ...P0, zoom: 16 }}
        onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
        onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
        <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />
        <Marker coordinate={P1} pinColor="blue" onClick={() => console.warn('onClick! p1')} />
        <Marker coordinate={P2} pinColor="red" onClick={() => console.warn('onClick! p2')} />
        <Path coordinates={[P0, P1]} onClick={() => console.warn('onClick! path')} width={10} />
        <Polyline coordinates={[P1, P2]} onClick={() => console.warn('onClick! polyline')} />
        <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={200} onClick={() => console.warn('onClick! circle')} />
        <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.warn('onClick! polygon')} />
      </NaverMapView>
    )

  }
  const renderTitle = () => {
    return (
      <View>
        <Text style={{
          color: '#00C1DE',
          fontSize: 20,
          fontWeight: 'bold',
          width: '100%'
        }}>
          {header}
        </Text>
      </View>
    )
  }
  useEffect(() => {
    if (open) {
      setIsShow(true)
    } else if (close) {
      setIsShow(false)
    }
    console.log(kind);

  }, [])

  return (
    <SafeAreaView
      style={{ flex: 1 }}>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={isShow}
        onRequestClose={close}
      >
        {kind !== "map" ?
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor: '#000000AA',
            // justifyContent: "center",
            // alignContent: "center",
            // alignItems: "center",
          }}>
            {/* {outsideTouchable(onTouchOutSide)} */}
            <View style={{
              width: 300,
              flex: 0.5,
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              padding: 50,
              alignItems: 'center',
              justifyContent: 'center',
              // paddingHorizontal: 20,
              // paddingVertical: 20,
              maxHeight: deviceHeight * 0.2
            }}>
              <Text style={{
                color: '#00C1DE',
                fontSize: 20,
                fontWeight: 'bold',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}>
                {header}
              </Text>
              <View>
                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    borderRadius: 20,
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'space-around',
                    backgroundColor: '#00C1DE',
                    width: 100,
                    height: 50,
                  }}
                  onPress={close}>
                  <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white'
                  }}>닫기</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
          :
          MyMap()
        }

      </Modal>
    </SafeAreaView>

  )
}
export default BottomPopup;