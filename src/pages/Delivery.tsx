import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import Complete from "./Complete";
import Ing from "./Ing";

const Stack = createNativeStackNavigator();

function Delivery() {
    return (
        <Stack.Navigator initialRouteName="Ing">
            <Stack.Screen name="ing" component={Ing} options={{ headerShown: false }} />
            <Stack.Screen name="Complete" component={Complete} />
        </Stack.Navigator>
    )

}
export default Delivery;