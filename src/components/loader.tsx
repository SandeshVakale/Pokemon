import React from 'react';
import {SafeAreaView, ActivityIndicator, StyleSheet} from 'react-native';
import {colors} from '../theme';

export const Loader = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator />
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

export default Loader;
