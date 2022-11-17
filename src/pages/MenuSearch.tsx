import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

type MenuSearch = {
  navigation?: any,
  route: any
}
const MenuSearch = ({ navigation, route }: MenuSearch) => {
  const onPress = (e: { nativeEvent: { text: string } }) => {
    console.log(e.nativeEvent);
    const { text } = e.nativeEvent;
    console.log("검색어:", text);

    navigation.navigate('LoginSucess', { menu: text })
  }

  return (
    <View style={SearchWrapper.MainContainer}>
      <View style={SearchWrapper.SearchContainer}>
        <Icon name='search-outline' size={20} color="black" />
        <TextInput
          multiline={false}
          blurOnSubmit={false}
          onSubmitEditing={onPress}
          placeholder="오늘 끌리는 메뉴는?"
        // onChangeText={value => onPress(value)} 
        />
      </View>

      <View style={SearchWrapper.RecommandContainer}>
        <Text style={SearchWrapper.RecommandSearch}>최근 검색어🔎</Text>
      </View>
    </View>
  )
}
const SearchWrapper = StyleSheet.create({
  MainContainer: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  SearchContainer: {
    // paddingTop: 10,
    // flex: 1,
    width: 300,
    height: 40,
    flexDirection: 'row',
    marginTop: 50,
    paddingLeft: 20,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    borderRadius: 20
  },
  RecommandContainer: {
    flex: 1,
    // height: 30,
    // justifyContent: 'center',
    // alignItems: 'center',
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
})
export default MenuSearch;