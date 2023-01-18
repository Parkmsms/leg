import React, { useEffect, useState, } from "react";
import { Keyboard, Alert, Button, PermissionsAndroid, Dimensions, Image, Linking, NativeScrollEvent, NativeSyntheticEvent, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import { SaveReviewAPI, getAccessToken } from "../../config/AxiosFunction";
import { ReviewInfo, initialReviewInfo } from "../../models/reviewInfo";
import Icon from 'react-native-vector-icons/Ionicons';
import Stars from 'react-native-stars';
import BottomSheet from "../../components/Modal/BottomSheet";
import { getAccessToken ,SaveReviewAPI} from "../../config/AxiosFunction";
import useDidMountEffect from "../../config/useDidMountEffect";
//MIT Lisense from https://www.npmjs.com/package/react-native-image-resizer
import ImageResizer from 'react-native-image-resizer';
import RNFetchBlob from 'rn-fetch-blob'

type ReviewWriteProps = {
  route: any;
  navigation?: any;
  isClicked: boolean;
}

let FormData = require('form-data');

const width = Dimensions.get('window').width;
const ReviewPage = ({ isClicked, navigation, route }: ReviewWriteProps) => {
  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJsZWciLCJpYXQiOjE2NzM0Mjg5NjAsInN1YiI6IjExIiwidG9rZW5UeXBlIjp0cnVlLCJhY2NvdW50VHlwZSI6IlVTRVIiLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9VU0VSIn1dfQ.3VZvbwQVoPOEIvC9iOlNLf3Nb9LZ1IwR9ye89SgzEhH1Rc1w-7QWFCvLsQ_fAffoO6h-Tf8BanmBjakgLSL4gQ'
  const [inputReview, setInputReview] = useState<string>('');
  const [photo, setPhoto] = useState<any>('');
  const [request, setRequest] = useState<ReviewInfo>(initialReviewInfo)
  const [modalVisible, setModalVisible] = useState(false);

  // customHook => 첫 렌더링때도 state가 설정되는 것으로 보고 useEffect가 실행하는것 방지
  useDidMountEffect(() => {
    console.log(request)
  }, isClicked)

  useEffect(() => {
    console.log(route.params)
  }, [])
  

  const selectPhoto = () => {
    setModalVisible(true);
  }
  const saveReview = async () => {
    console.log(request,route.params?.orderId)
    // const accessToken = await getAccessToken('accessToken');

    await ImageResizer.createResizedImage(
      request.pictureUrl.uri, 240, 240, 'JPEG', 30, 0)
    .then((response) => {

      //formData
      const formData = new FormData();

      let data = {
        orderId:route.params?.orderId,
        star:request.star,
        comment:request.comment
      }
      const json_data = JSON.stringify(data);
      const reqDto = new Blob([json_data], { type: "application/json" });
      // const reqDto = JSON.stringify(data);
      
      formData.append('images',{
        uri:response.uri,
        type:request.pictureUrl.type,
        name:response.name
      });

      formData.append('reqDto',reqDto);

      //axios
      // const response = await SaveReviewAPI (accessToken,request.pictureUrl,reqDto);
      // console.log("saveReviewInfo ======>",re sponse)

      //fetch
      fetch('http://0giri.com/api/reviews', { 
        method:'post',
        body:formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: accessToken ? 'Bearer ' + accessToken : '',
        },
        }).then(res => res.json())
        .then((res) => {
          console.log(`${JSON.stringify(res)}! , image 업로드`)

        })
        .catch(err => {
        console.log("catch 에러",err)
        })
      

      //RNFetchBlob
      // RNFetchBlob.fetch('POST', 'http://0giri.com/api/reviews', {
      //   accept: 'application/json',
      //   Authorization: accessToken ? 'Bearer ' + accessToken : '',
      //   'content-type': 'multipart/form-data',
      // }, [
      //   { name : 'Images', filename : response.name, type:request.pictureUrl.type, data: RNFetchBlob.wrap(response.uri) },
      //   { name : 'reqDto', data : JSON.stringify(reqDto)},
      // ]).then((resp) => {
      //   console.log("결과 =", resp)
      //   // ...
      // }).catch((err) => {
      //   console.log("에러 =", err)
      //   // ...
      // })


    });

  }

  const goTakePhoto = async () => {
    try {
      //카메라 권한체크
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      )
      //Persmssion시
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result: any = await launchCamera({
          mediaType: 'photo',
          cameraType: 'back',
          maxHeight: 200,
          maxWidth: 200,
        });
        if (result.didCancel) {
          return null;
        }
        const localUri = result.assets[0].uri;
        const uriPath = localUri.split("//").pop();
        // const imageName = localUri.split("/").pop();
        setPhoto("file://" + uriPath);
        setRequest((current) => {
          let newCondition = { ...current };
          newCondition.pictureUrl = result.assets[0];
          return newCondition;
        });
      }
      //denied시
      else {
        console.log("location permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  const goGallery = async () => {
    try {
      //앨범 권한 체크
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      )
      //Persmssion시
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result: any = await launchImageLibrary({
          mediaType: 'photo',
          maxHeight: 200,
          maxWidth: 200
        });
        if (result.didCancel) {
          return null;
        }
        const localUri = result.assets[0].uri;
        const uriPath = localUri.split("//").pop();
        // const imageName = localUri.split("/").pop();
        setPhoto("file://" + uriPath);
        setRequest((current) => {
          let newCondition = { ...current };
          newCondition.pictureUrl = result.assets[0];
          return newCondition;
        });
      }
      //denied 시
      else {
        console.log("location permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  return (
    <SafeAreaView style={ReviewWrapper.Container}>
      <View style={ReviewWrapper.CenterAlign} >
        <View style={ReviewWrapper.ContentsBox}>
          <View style={ReviewWrapper.Vertical}>
            <View style={ReviewWrapper.CenterAlign}>
              <Image
                source={require('../../assets/main.png')}
                style={{
                  justifyContent: "center",
                  alignItems: 'center',
                  borderRadius: 12,
                  width: 90, height: 70
                }}
                resizeMode="stretch"
              />
            </View>

            <View
              style={[ReviewWrapper.Horizontal, {
                padding: 20
              }]}>
              <Text style={[ReviewWrapper.FontText,
              {
                fontSize: 14,
                color: '#000000',
                fontWeight: 'bold'
              }]}>미쁘동</Text>
              <Text style={[ReviewWrapper.FontText,
              {
                fontSize: 14,
                marginBottom: 10,
                color: '#8F8F8F',
                fontWeight: '500',
              }]}>미쁘동 / 일회용품 선택 O</Text>
            </View>
          </View>
        </View>
        <Text style={ReviewWrapper.FontText}>리뷰를 작성해주세요👩🏻‍💻</Text>
        <View style={{ marginTop: 10 }}>
          <Stars
            default={0}
            count={5}
            starSize={50}
            update={(val: number) =>
              setRequest((current) => {
                let newCondition = { ...current };
                newCondition.star = val;
                return newCondition;
              })}
            fullStar={<Icon name={'star'} color={"#00C1DE"} size={25} />}
            emptyStar={<Icon name={'star-outline'} color={"grey"} size={25} />}
          />
        </View>
        <TextInput
          multiline={true}
          numberOfLines={10}
          style={ReviewWrapper.TextArea}
          blurOnSubmit={false}
          onChangeText={(val: string) => setRequest((current) => {
            let newCondition = { ...current };
            newCondition.comment = val;
            return newCondition;
          })}
          placeholder="리뷰작성"
          placeholderTextColor="grey"
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity style={ReviewWrapper.AddPhotoButton} onPress={selectPhoto}>
          <Text style={ReviewWrapper.AddPhotoButtonText}>사진 첨부하기</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={selectPhoto}>
          <Image
            source={{ uri: photo ? photo : null }}
            style={{
              justifyContent: "center",
              alignItems: 'center',
              borderRadius: 5,
              width: 110, height: 90,
              margin: 10
            }}
            resizeMode="stretch"
          />
        </TouchableOpacity>


        <TouchableOpacity style={ReviewWrapper.SubmitButton} onPress={saveReview}>
          <Text style={ReviewWrapper.SubmitButtonText}>리뷰 등록하기</Text>
        </TouchableOpacity>
      </View >
      <BottomSheet
        style={ReviewWrapper.rootContainer}
        modalVisible={modalVisible}
        goTakePhoto={goTakePhoto}
        goGallery={goGallery}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  )
}
export const ReviewWrapper = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20
  },
  TextArea: {
    width: width * 0.9,
    height: width * 0.45,
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    textAlignVertical: 'top',
    margin: 10,
    borderColor: 'rgba(124, 0, 0, 0.05)',
    borderWidth: 1,
  },
  CenterAlign: {
    justifyContent: "center",
    alignItems: 'center',
  },
  ContentsBox: {
    borderBottomWidth: 0.4,
    width: width * 0.9,
    marginTop: 20,
    sborderRadius: 1,
    paddingLeft: 26,
    paddingRight: 26,
    borderColor: '#A2A2A2',
    backgroundColor: 'white',
  },
  Horizontal: {
    flexDirection: 'column'
  },
  Vertical: {
    flexDirection: 'row'
  },
  AddPhotoButton: {
    width: width * 0.9,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderStyle: 'solid',
    borderColor: '#00C1DE',
    borderRadius: 12,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
  },
  SubmitButton: {
    width: width * 0.9,
    backgroundColor: '#00C1DE',
    borderRadius: 12,
    height: 54,
    justifyContent: 'center',
    alignContent: 'center',
  },
  InActivateButton: {
    backgroundColor: '#3E3E3E',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center'
  },
  AddPhotoButtonText: {
    fontSize: 13,
    fontFamily: 'Apple SD Gothic Neo',
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#00C1DE',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  SubmitButtonText: {
    fontSize: 20,
    fontFamily: 'Urbanist',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#FFFFFF',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  FontText: {
    fontFamily: 'Apple SD Gothic Neo',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    color: 'black',
    fontWeight: '500',
    marginTop: 10,
    fontSize: 14
  },
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});


export default ReviewPage;