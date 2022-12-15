import React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, Text} from 'react-native';
import {colors, typography} from '../theme';
import {RootStackParamList} from '../types';
import {List} from '../screens/list';
import {Details} from '../screens/details';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Entypo} from '@expo/vector-icons';
const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  const {h5} = typography;
  const navigationRef = useNavigationContainerRef();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="List"
          component={List}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={({route}) => ({
            headerBackTitleVisible: false,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigationRef.goBack()}>
                <Entypo
                  style={styles.icon}
                  name="circle-with-cross"
                  size={24}
                  color={colors.white}
                />
              </TouchableOpacity>
            ),
            headerTitle: () => (
              <Text style={[h5, {color: colors.white}]}>
                {route.params.pokemon.name.toUpperCase()}
              </Text>
            ),
            headerStyle: {
              backgroundColor: route.params.color,
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    padding: 10,
  },
});
