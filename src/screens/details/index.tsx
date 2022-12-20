import React, {useEffect} from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getPokemon} from '../../services/details';
import {colors} from '../../theme';
import {RootStackParamList} from '../../types';
import {RootState} from '../../store';
import Tab from './topBar';
import {Loader} from '../../components/loader';
import {Error} from '../../components/error';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export const Details = ({route}: Props) => {
  const {isFetching, error} = useSelector(
    (state: RootState) => state.detailsModel,
  );

  useEffect(() => {
    getPokemon(route.params.pokemon.name);
  }, [route.params.pokemon.name]);
  if (isFetching) {
    return <Loader />;
  }

  if (error.isError) {
    return <Error error={error} />;
  }

  return (
    <View style={styles.container}>
      <View
        style={[styles.upperContainer, {backgroundColor: route.params.color}]}>
        <Image source={{uri: route.params.pokemon.url}} style={styles.image} />
      </View>
      <View style={styles.bottomContainer}>
        {/* @ts-ignore:next-line */}
        <Tab describe={route?.params?.describe} />
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
