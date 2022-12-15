import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
    Button,
  ScrollView
} from 'react-native';
import { Dimensions } from "react-native";
import OrderPopUp from "../../components/Modal/OrderPopUp";

const width = Dimensions.get('window').width;

const OrderStatus = ({navigation}: {navigation: any}) => { 
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => {
        setModalOpen(false);
    }
    const openModal = () => {
        setModalOpen(true);
    }
    
    const goReview = () => {
        setModalOpen(false);
        navigation.navigate('ReviewPage')
      }
    return (
        <SafeAreaView style={OrderWrapper.MainContainer}>
            <View style={OrderWrapper.Vertical}>
                <Text style={OrderWrapper.FontStatus}>픽업 대기중입니다🍽</Text>
                <Image source={require('../../assets/location.png')}
                    style={{
                        width: 180,
                        height: 180,
                        padding:30,
                        justifyContent: "center",
                        alignItems: 'center',
                        borderRadius: 20,
                    }} />
                <View style={OrderWrapper.Horizontal}>
                    <Text style={OrderWrapper.FontTime}>60</Text>
                    <Text style={OrderWrapper.FontMinute}>분</Text>
                </View>
                <View style={{ margin: 15, height: 150 }}>
                    <ScrollView>
                        <TouchableOpacity style={OrderWrapper.CommentBox}>
                            <Text style={OrderWrapper.FontColor}>미쁘동/일회용품선택 O</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={OrderWrapper.CommentBox}>
                            <Text style={OrderWrapper.FontColor}>미쁘동/일회용품선택 X</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={OrderWrapper.CommentBox}>
                            <Text style={OrderWrapper.FontColor}>사장 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={OrderWrapper.CommentBox}>
                            <Text style={OrderWrapper.FontColor}>사장 </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <TouchableOpacity
                    style={OrderWrapper.ActivateButton}
                    onPress={openModal}
                >
                    <Text style={OrderWrapper.ButtonText}>포장받기 완료</Text>
                </TouchableOpacity>

            </View >
                 
            <OrderPopUp
                open={modalOpen}
                close={closeModal}
                title={"별점을 선택해주세요"}
                subTitle = {"어떠셨나요? :)"} 
                onTouchOutSide={closeModal}
                go={goReview}
            />
        </SafeAreaView>
    )
}
export const OrderWrapper = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: 'white',
        width: width,
        height:width*0.6,
        justifyContent: 'center',
        alignItems: 'center', 
        padding:15
    },
    Horizontal: {
        flexDirection: 'row',
        margin:10
    },
    Vertical: {
        marginTop:50,
        flexDirection: 'column',
        alignItems: 'center', 
    },
    ActivateButton: {
        backgroundColor: '#00C1DE',
        borderRadius: 12,
        height: 54,
        justifyContent: 'center',
        alignContent: 'center',
        width: width * 0.8
    },
    ButtonText: {
        fontSize: 20,
        fontFamily: 'Urbanist',
        fontStyle:'normal',
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    FontStatus: {
        fontFamily: 'Apple SD Gothic Neo',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 24,
        alignItems: 'center',
        color: '#000000'
    },
    FontMinute: {
        color: '#000000',
        fontSize: 30,
        fontFamily: 'Urbanist',
        fontStyle: 'normal',
        fontWeight:'800',
    },
    FontTime: {
        color: '#00C1DE',
        fontSize: 30,
        fontFamily: 'Urbanist',
        fontStyle: 'normal',
        fontWeight:'800',
    },
    FontColor: {
        fontFamily: 'Apple SD Gothic Neo',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 15,
        letterSpacing: 0.2,
        color:'#00C1DE'
    },
    CommentBox: {
        backgroundColor: 'rgba(0, 193, 222, 0.12)',
        borderRadius: 15,
        marginTop:8,
        marginLeft:8,
        padding: 10,
        width: width * 0.75
    }
});


export default OrderStatus