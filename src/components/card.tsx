import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {result, RootStackParamList} from '../types';
import {LinearGradient} from 'expo-linear-gradient';
import {ColorModifier} from '../utils/colorModifier';
import {typography} from '../theme';
import {GetSpeciesDetails} from '../utils/getSpecies';
import {colors} from '../theme';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = StackNavigationProp<RootStackParamList, 'Details'>;
const CardMemo = ({
  index,
  pokemon,
  isColored = false,
  navigation,
}: {
  index: number;
  pokemon: result;
  isColored: boolean;
  navigation: Props;
}) => {
  const {h6, h7} = typography;

  const [species, setSpecies] = useState<any>(null);
  useEffect(() => {
    isColored &&
      GetSpeciesDetails(pokemon.name)?.then(data => setSpecies(data.data));
  }, [isColored, pokemon.name]);

  const {lightColor, darkColor, mainColor} = ColorModifier(
    species?.color?.name,
  );
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Details', {
          pokemon: pokemon,
          color: mainColor,
          describe: species?.flavor_text_entries[0]?.flavor_text,
        })
      }>
      <LinearGradient
        colors={
          species
            ? [mainColor, darkColor]
            : [colors.lightColor, colors.mainColor]
        }
        key={index}
        style={styles.container}>
        <Image source={{uri: pokemon.url}} style={styles.image} />
        <View
          style={[
            styles.circle,
            {
              backgroundColor: lightColor,
            },
          ]}
        />
        <Text style={[h6, styles.text]}>
          {pokemon.name.toLocaleUpperCase()}
        </Text>
        {species?.shape && (
          <View
            style={[styles.subtitleContainer, {backgroundColor: darkColor}]}>
            <Text style={[h7, styles.textSubtitle]}>{species.shape.name}</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

function arePropsEqual(
  prevProps: {pokemon: result},
  nextProps: {pokemon: result},
) {
  /*
    return true if passing nextProps to render would return
    the same result as passing prevProps to render,
    otherwise return false
    */
  return (
    nextProps.pokemon.name === prevProps.pokemon.name &&
    nextProps.pokemon.url === prevProps.pokemon.url
  );
}

export const Card = React.memo(CardMemo, arePropsEqual);

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.2,
    width: Dimensions.get('window').width * 0.45,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 20,
    padding: 15,
    margin: 10,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    right: -20,
    bottom: 0,
    zIndex: 100,
    height: Dimensions.get('window').height * 0.12,
    width: Dimensions.get('window').width * 0.4,
    resizeMode: 'contain',
  },
  text: {
    color: colors.white,
  },
  textSubtitle: {
    color: colors.white,
  },
  subtitleContainer: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    height: 120,
    width: 120,
    borderRadius: 60,
    position: 'absolute',
    right: -20,
    bottom: -20,
  },
});
