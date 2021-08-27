import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChallengePage from "../components/Challenge/ChallengePage";

const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Challenge details"
                    component={ChallengePage}
                    options={{ title: 'Welcome' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};