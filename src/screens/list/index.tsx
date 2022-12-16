import React, {useEffect} from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getPokemons} from '../../services/list';
import {useSelector} from 'react-redux';
import {RootState, store} from '../../store';
import {SET_PAGE} from '../../store/list';
import {Card} from '../../components/card';
import {colors} from '../../theme';
import {result, RootStackParamList} from '../../types';
import {Error} from '../../components/error';
import {Loader} from '../../components/loader';

export const List = () => {
  const {listResults, isFetching, error, page} = useSelector(
    (state: RootState) => state.listModel,
  );
  const navigation = useNavigation<RootStackParamList>();
  const pageSize = 10;
  useEffect(() => {
    getPokemons(pageSize, (page - 1) * pageSize);
  }, [page]);
  if (isFetching && listResults.length <= 0) {
    return <Loader />;
  }

  if (error.isError) {
    return <Error error={error} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        initialNumToRender={listResults.length}
        contentContainerStyle={styles.listContainer}
        data={listResults}
        numColumns={2}
        renderItem={({item, index}: {item: result; index: number}) => (
          <Card
            index={index}
            pokemon={item}
            isColored
            navigation={navigation}
          />
        )}
        refreshing={isFetching}
        onEndReachedThreshold={0.9}
        onEndReached={() =>
          store.dispatch({
            type: SET_PAGE,
            payload: page + 1,
          })
        }
        ListFooterComponent={
          isFetching ? (
            <ActivityIndicator style={styles.activtyContainer} />
          ) : (
            <View />
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
  listContainer: {alignSelf: 'center'},
  activtyContainer: {
    alignSelf: 'center',
    height: 200,
    width: Dimensions.get('screen').width,
  },
});
