import React from 'react';
import {Text, StyleSheet, ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import {typography, colors} from '../../theme';
import {RootState} from '../../store';

export const About = (props: {describe: string}) => {
  const {details} = useSelector((state: RootState) => state.detailsModel);
  const {h6, h7} = typography;
  let text = props.describe.replace('\f', ' ').replace('\n', ' ');
  return (
    <ScrollView style={styles.container}>
      <Text style={[h6, styles.text]}>{text}</Text>
      <View style={styles.wrapper}>
        <Text style={h6}>Experience</Text>
        <Text style={h7}>{details.base_experience}</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={h6}>Height</Text>
        <Text style={h7}>{details.height}</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={h6}>Weight</Text>
        <Text style={h7}>{details.weight}</Text>
      </View>
      {details?.types?.length > 0 && (
        <View style={styles.wrapper}>
          <Text style={h6}>Types</Text>
          <Text style={h7}>
            {details?.types.map((item: any) => item?.type?.name).join(', ')}
          </Text>
        </View>
      )}
      {details?.abilities?.length > 0 && (
        <View style={styles.wrapper}>
          <Text style={h6}>Abilities</Text>
          <Text style={h7}>
            {details?.abilities
              .map((item: any) => item?.ability?.name)
              .join(', ')}
          </Text>
        </View>
      )}
      {details?.forms?.length > 0 && (
        <View style={styles.wrapper}>
          <Text style={h6}>Forms</Text>
          <Text style={h7}>
            {details?.forms.map((item: any) => item?.name).join(', ')}
          </Text>
        </View>
      )}
      {details?.held_items?.length > 0 && (
        <View style={styles.wrapper}>
          <Text style={h6}>Items</Text>
          <Text style={h7}>
            {details?.held_items
              .map((item: any) => item?.item?.name)
              .join(', ')}
          </Text>
        </View>
      )}
      {details?.Moves?.length > 0 && (
        <View style={styles.wrapper}>
          <Text style={h6}>Moves</Text>
          <Text style={h7}>
            {details.moves.map((item: any) => item.move.name).join(', ')}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  text: {
    textAlign: 'center',
    padding: 15,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});
