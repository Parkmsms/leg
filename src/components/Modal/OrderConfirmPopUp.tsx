import React, { useEffect, useState } from "react"
import { Modal, Text, View, Dimensions, StyleSheet, TouchableWithoutFeedback, SafeAreaView, Button, TouchableOpacity } from "react-native";
type BottomPopupProps = {
    open: boolean;
    close: any;
    title: string;
    subTitle: string;
    openResult: any
    openCancle: any
    id: number
}
import Icon from 'react-native-vector-icons/Ionicons';

const deviceHeight = Dimensions.get("window").height;
const OrderConfirmPopUp = (props: BottomPopupProps) => {
    const { open, close, title, subTitle, id } = props;
    const [isShow, setIsShow] = useState<boolean>(false);

    useEffect(() => {
        if (open) {
            setIsShow(true)
        } else if (close) {
            setIsShow(false)
        }
    })

    const pressAccept = async () => {

        switch (title) {
            case '포장받기 완료':
                props.openResult()
                break;
            case '주문 취소':
                props.openCancle()
                break;
        }

    }

    return (
        <SafeAreaView
            style={{ flex: 1 }}>
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={isShow}
                onRequestClose={close}
            >
                <View style={ModalWrapper.ModalContainer}>
                    <View style={ModalWrapper.ModalIcon}>
                        <Icon name="ios-alert" size={35} color="#00C1DE" />
                    </View>
                    <View style={ModalWrapper.ModalItemBox}>
                        <Text style={ModalWrapper.BigTitle}>
                            {title}
                        </Text>
                        <Text style={ModalWrapper.smallTitle}>
                            {subTitle}
                        </Text>

                        <View>
                            <TouchableOpacity
                                style={ModalWrapper.ActiveButton}
                                onPress={pressAccept}>
                                <Text style={ModalWrapper.ButtonText}>예</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={close} style={{ marginTop: 10, }
                        }>
                            <Text>아니오</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        </SafeAreaView>

    )
}

export const ModalWrapper = StyleSheet.create({
    ModalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000AA',
    },
    ModalIcon: {
        borderWidth: 3.3,
        borderRadius: 25,
        top: 18,
        padding: 5,
        backgroundColor: '#FFFFFF',
        zIndex: 1,
        borderColor: '#00C1DE'
    },
    ModalItemBox: {
        width: 320,
        flex: 0.5,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        padding: 50,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingHorizontal: 20,
        // paddingVertical: 20,
        maxHeight: deviceHeight * 0.33
    },
    BigTitle: {
        color: '#000000',
        fontSize: 19,
        fontWeight: 'bold',
        fontFamily: 'Urbanist',
        fontStyle: 'normal',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        letterSpacing: 0.1
    },
    smallTitle: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '200',
        fontFamily: 'Urbanist',
        fontStyle: 'normal',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        letterSpacing: 0.5,
        marginTop: 5
    },
    ActiveButton: {
        marginTop: 20,
        borderRadius: 20,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#00C1DE',
        height: 40,
        width: 250
    },
    ButtonText: {
        fontSize: 16,
        fontFamily: 'Urbanist',
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: 'white'
    }


});
export default OrderConfirmPopUp;