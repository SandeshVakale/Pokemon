import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, View} from 'react-native';

const Stack = createStackNavigator();

const Example = () => {
  return (
    <View>
      <Text>Example</Text>
    </View>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List" component={Example} />
        <Stack.Screen name="Details" component={Example} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
