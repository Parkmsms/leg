import React, { useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Modal,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
    PanResponder,
    Image,
    TouchableOpacity
} from 'react-native';
const width = Dimensions.get('window').width;

const BottomSheet = (props:any) => {
    const { modalVisible, setModalVisible} = props;
    const screenHeight = Dimensions.get("screen").height;
    // panY에 따라 BottomSheet의 y축 위치를 결정 / Animated -> 상태값 변경없이 실시간 css 변경
    const panY = useRef(new Animated.Value(screenHeight)).current; //초기값을 휴대폰 높이로 설정 panY
    //위치 -1 => 0 , 0=> 0, 1=>1 치환
    //translateY = 0  <= 모달 닫힘, 0 변경
    const translateY = panY.interpolate({
        // inputRage의 -1을 outpuRage의 0으로 치환하기 때문에 panY가 0보다 작아져도 BottomSheet의 y축 위치에는 변화가 없음
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    const getPhoto = () => {
        closeBottomSheet.start(()=>{
            setModalVisible(false);
        })
        props.goTakePhoto();
    }
    const getGallery = () => {
        closeBottomSheet.start(()=>{
            setModalVisible(false);
        })
        props.goGallery();
    }

    const resetBottomSheet = Animated.timing(panY, {
        //panY를 0으로 변경 => 위로 올라오게 된다.
        toValue: 0,
        //value변경까지의 duration 
        duration: 300,
         //animation 부드럽게
        useNativeDriver: true,
    });

    const closeBottomSheet = Animated.timing(panY, {
        //panY를 휴대폰높이로 변경 => 밑으로 내려가게 된다.
        toValue: screenHeight,
        duration: 300,
        //animation 부드럽게
        useNativeDriver: true,
    });

    //사용자 동작
    const panResponders = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        // BottomSheet에 터치 또는 드래그 이벤트가 발생할 때 실행
        onPanResponderMove: (event, gestureState) => {
            // 처음 터치 영역을 기준으로 y축으로 드래그한 거리를 panY에 저장
            panY.setValue(gestureState.dy);
        },
        // 유저가 BottomSheet 손을 뗐을 때 실행

        //당기는 속도가 초당 1.5 이상일 경우 모달을 닫는다 
        onPanResponderRelease: (event, gestureState) => {
            if(gestureState.dy > 0 && gestureState.vy > 1.5) {
                closeModal();
            }
            else {
                //위치 초기화
                resetBottomSheet.start();
            }
        }
    })).current;

    useEffect(()=>{
        if(props.modalVisible) {
            resetBottomSheet.start();
        }
    }, [props.modalVisible]);

    const closeModal = () => {
        closeBottomSheet.start(()=>{
            setModalVisible(false);
        })
    }

    return (
        <Modal
            visible={modalVisible}
            animationType={"fade"}
            transparent
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <TouchableWithoutFeedback
                    onPress={closeModal}
                >
                    <View style={styles.background}/>
                </TouchableWithoutFeedback>
                <Animated.View
                    style={{...styles.bottomSheetContainer, transform: [{ translateY: translateY }]}}
                    {...panResponders.panHandlers}
                >
                    <Text style={[styles.ButtonText, {color: '#000000',fontWeight:'900',fontSize:16,letterSpacing:0.2}]}>이런 사진이 좋아요!</Text> 
                    <Text style={[styles.ButtonText, {color: '#000000',fontWeight:'200',fontSize:12,letterSpacing:0.1}]}>배달 받은 음식을 직접 촬영하여 올려주세요.</Text>
                    <Text style={[styles.ButtonText, {color: '#000000',fontWeight:'200' ,fontSize:12,letterSpacing:0.1}]}>음식의 포장 상태를 알려주시는 것도 좋아요.</Text>  
                    <View style={{flexDirection: 'row'}}>
                        <Image
                            source={require('../../assets/banner.png')}
                            style={{
                            justifyContent: "center",
                            alignItems: 'center',
                            width: 100, height: 70,
                            marginTop:10
                            }}
                            resizeMode="stretch"
                        />
                        <Image
                            source={require('../../assets/background.png')}
                            style={{
                            justifyContent: "center",
                            alignItems: 'center',
                            width: 100, height: 70,
                            marginTop:10
                            }}
                            resizeMode="stretch"
                        />
                    </View>
                    <TouchableOpacity style={styles.SubmitButton} onPress={getPhoto}>
                        <Text style={styles.ButtonText}>사진 찍기</Text>
                    </TouchableOpacity>   
                    <TouchableOpacity style={styles.SubmitButton} onPress={getGallery}>
                        <Text style={styles.ButtonText}>사진 선택</Text>
                    </TouchableOpacity>   
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
    background: {
        flex: 1,
    },
    bottomSheetContainer: {
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    AddPhotoButtonText: {
        fontSize: 15,
        fontFamily: 'Apple SD Gothic Neo',
        fontStyle:'normal',
        fontWeight: '600',
        color: '#00C1DE',
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    AddPhotoButton: {
        width:width*0.9,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderStyle:'solid',
        borderColor:'#00C1DE',
        borderRadius: 12,
        height: 40,
        justifyContent: 'center',
        alignContent: 'center',
        marginTop:20
    },
    SubmitButton: {
        width:width*0.9,
        backgroundColor: '#00C1DE',
        borderRadius: 12,
        height: 40,
        justifyContent: 'center',
        alignContent: 'center',
        marginTop:20
    },
    ButtonText: {
        fontSize: 17,
        fontFamily: 'Urbanist',
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center'
      },
})

export default BottomSheet;