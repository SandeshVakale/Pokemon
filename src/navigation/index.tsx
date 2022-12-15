import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text, View} from 'react-native';

import {List} from '../screens/list';

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
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="List" component={List} />
          <Stack.Screen name="Details" component={Example} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
