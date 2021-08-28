import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChallengePage from "../components/Challenge/ChallengePage";
import SearchScreen from "../components/SearchScreen";

const Stack = createNativeStackNavigator();

const SearchScreenNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SearchScreen">
                <Stack.Screen name="SearchScreen" component={SearchScreen} />
                <Stack.Screen
                    name="Challenge details"
                    component={SearchScreen}
                    options={{ title: 'Welcome' }}
                />
                <Stack.Screen
                    name="Challenge details"
                    component={ChallengePage}
                    options={{ title: 'Welcome' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default SearchScreenNavigator;