import React, { useEffect, useState } from "react"
import { Modal, Text, View, Dimensions, TouchableWithoutFeedback, SafeAreaView, Button, TouchableOpacity } from "react-native";
type BottomPopupProps = {
  open: boolean;
  close: any;
  header: string;
  onTouchOutSide: any;
}

const BottomPopup = (props: BottomPopupProps) => {
  const { open, close, header, onTouchOutSide } = props;
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
  })

  return (
    <SafeAreaView
      style={{ flex: 1 }}>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={isShow}
        onRequestClose={close}
      >
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
      </Modal>
    </SafeAreaView>

  )
}
export default BottomPopup;