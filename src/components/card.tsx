import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Text, StyleSheet, View} from 'react-native';
import {result} from '../store/list';
import {LinearGradient} from 'expo-linear-gradient';
import {ColorModifier} from '../utils/colorModifier';
import {typography} from '../theme';
import {GetSpeciesDetails} from '../utils/getSpecies';

const CardMemo = ({index, pokemon}: {index: number; pokemon: result}) => {
  const {h6, h7} = typography;

  const [species, setSpecies] = useState<any>(null);
  useEffect(() => {
    GetSpeciesDetails(pokemon.name)?.then(data => setSpecies(data.data));
  });

  const {lightColor, darkColor, mainColor} = ColorModifier(
    species?.color?.name,
  );
  return (
    <LinearGradient
      colors={species ? [mainColor, darkColor] : ['yellow', 'gold']}
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
      <Text style={[h6, styles.text]}>{pokemon.name.toLocaleUpperCase()}</Text>
      {species?.shape && (
        <Text style={[h7, styles.textSubtitle]}>{species.shape.name}</Text>
      )}
    </LinearGradient>
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
    color: 'white',
  },
  textSubtitle: {
    color: 'white',
    padding: 5,
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
