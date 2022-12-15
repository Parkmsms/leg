import React, { useEffect, useState } from "react"
import { Modal, Text, View, Dimensions, TouchableWithoutFeedback, SafeAreaView, Button, TouchableOpacity } from "react-native";
type BottomPopupProps = {
  open: boolean;
  close: any;
  title: string;
  subTitle: string;
  onTouchOutSide: any;
  go:any
}
import Icon from 'react-native-vector-icons/Ionicons';
import Stars from 'react-native-stars';


const BottomPopup2 = (props: BottomPopupProps) => {
  
  const { open, close, title, subTitle } = props;
  const [isShow, setIsShow] = useState<boolean>(false);
  const [star,setStar] = useState<Number>(0)
  const deviceHeight = Dimensions.get("window").height;

  const goReview = () => {
    props.go();
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
          backgroundColor: '#000000AA',
        }}>
          <View style={{
            width: 300,
            flex: 0.5,
            backgroundColor: '#FFFFFF',
            borderRadius: 5,
            padding: 50,
            alignItems: 'center',
            justifyContent: 'center',
            // paddingHorizontal: 20,
            // paddingVertical: 20,
            maxHeight: deviceHeight * 0.33
          }}>
            <Text style={{
              color: '#000000',
              fontSize: 19,
              fontWeight: 'bold',
              fontFamily: 'Urbanist',
              fontStyle:'normal',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              letterSpacing:0.1
            }}>
              {title}
            </Text>
            <Text style={{
              color: '#000000',
              fontSize: 14,
              fontWeight: '500',
              fontFamily: 'Urbanist',
              fontStyle:'normal',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              letterSpacing:0.5
            }}>
              {subTitle}
            </Text>
            <View style={{alignItems:'center'}}>
              <Stars
                default={star}
                count={5}
                starSize={50} 
                update= {(val:number)=> setStar(val)}
                fullStar={<Icon name={'star'} color={"#00C1DE"} size={30}/>}
                emptyStar={<Icon name={'star-outline'} color={"grey"} size={30}/>}
              />
              <Text style={{color:'black'}}>별개수 = {star}</Text>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  borderRadius: 20,
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'space-around',
                  backgroundColor: '#00C1DE',
                  height: 40,
                  width:250
                }}
                onPress={close}>
                <Text style={{
                  fontSize: 16,
                  fontFamily: 'Urbanist',
                  fontStyle:'normal',
                  fontWeight: 'bold',
                  color: 'white'
                }}>확인</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity onPress={goReview} style={{ marginTop: 10, }
          }>
              <Text>리뷰 쓰러 가기</Text>
           </TouchableOpacity>
            
          </View>
        </View>
      </Modal>
    </SafeAreaView>

  )
}
export default BottomPopup2;