import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {typography, colors} from '../theme';
import {MaterialIcons} from '@expo/vector-icons';
import {errorType} from '../types';

export const Error = ({error}: {error: errorType}) => {
  const {h3, h6} = typography;
  const {red} = colors;
  return (
    <SafeAreaView style={styles.container}>
      <MaterialIcons name="error" size={60} color={red} />
      <Text style={h3}>{error.code}</Text>
      <Text style={h6}>{error.message}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Error;
