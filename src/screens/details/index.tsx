import React from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import {colors} from '../../theme';
import {RootStackParamList} from '../../types';
import Tab from './topBar';
export const Details = ({route}: {route: RootStackParamList}) => {
  return (
    <View style={styles.container}>
      <View
        style={[styles.upperContainer, {backgroundColor: route.params.color}]}>
        <Image source={{uri: route.params.pokemon.url}} style={styles.image} />
      </View>
      <View style={styles.bottomContainer}>
        <Tab />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
  bottomContainer: {
    flex: 0.65,
    height: Dimensions.get('screen').height * 0.65,
    marginTop: -50,
    borderRadius: 35,
    backgroundColor: colors.white,
    borderColor: 'red',
  },
});
