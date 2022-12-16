import React from 'react';
import {StyleSheet, ScrollView, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryArea,
  VictoryPolarAxis,
  VictoryLabel,
  VictoryBar,
} from 'victory-native';
import {colors} from '../../theme';
import {RootState} from '../../store';

function processData(data, maxima) {
  //const maxByGroup = this.getMaxima(data);
  const makeDataArray = d => {
    return Object.keys(d).map(key => {
      return {x: key, y: d[key] / maxima[key]};
    });
  };
  return data.map(datum => makeDataArray(datum));
}

export const Stats = () => {
  const {details} = useSelector((state: RootState) => state.detailsModel);

  const max = Math.max(
    ...details?.stats?.map((item: {base_stat: any}) => item.base_stat),
  );
  const dataArray = details?.stats
    ? details?.stats?.map((item: any) => {
        return {
          base_stat: item.base_stat,
          effort: item.effort,
        };
      })
    : [];

  const barArray = details?.stats
    ? details?.stats?.map((item: any, index: number) => {
        return {
          y: item.base_stat,
          x: index,
          label: item.stat.name,
        };
      })
    : [];

  const maxima = dataArray.filter(
    (item: {base_stat: number}) => item.base_stat === max,
  )[0];

  const data = processData(dataArray, maxima);

  return (
    <ScrollView style={styles.container}>
      <VictoryChart height={400} width={Dimensions.get('window').width}>
        <VictoryBar data={barArray} />
      </VictoryChart>
      <VictoryChart polar theme={VictoryTheme.material} domain={{y: [0, 1]}}>
        <VictoryGroup
          colorScale={['gold', 'orange', 'tomato', 'gold', 'orange', 'tomato']}
          style={{data: {fillOpacity: 0.2, strokeWidth: 2}}}>
          {data.map((item: any, i: number) => {
            console.log(item);
            return <VictoryArea key={i} data={item} />;
          })}
        </VictoryGroup>
        {Object.keys(maxima).map((key, i) => {
          return (
            <VictoryPolarAxis
              key={i}
              dependentAxis
              style={{
                axisLabel: {padding: 10},
                axis: {stroke: 'none'},
                grid: {stroke: 'grey', strokeWidth: 0.25, opacity: 0.5},
              }}
              tickLabelComponent={<VictoryLabel labelPlacement="vertical" />}
              labelPlacement="perpendicular"
              axisValue={i + 1}
              label={key}
              tickFormat={t => Math.ceil(t * maxima[key])}
              tickValues={[0.25, 0.5, 0.75]}
            />
          );
        })}
        <VictoryPolarAxis
          labelPlacement="parallel"
          tickFormat={() => ''}
          style={{
            axis: {stroke: 'none'},
            grid: {stroke: 'grey', opacity: 0.5},
          }}
        />
      </VictoryChart>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
