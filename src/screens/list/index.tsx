import React, {useEffect} from 'react';
import {FlatList, ActivityIndicator, View, StyleSheet} from 'react-native';
import {getPokemons} from '../../services/list';
import {useSelector} from 'react-redux';
import {RootState, store} from '../../store';
import {result, SET_PAGE} from '../../store/list';

import {Card} from '../../components/card';

export const List = () => {
  const {listResults, isFetching, error, page} = useSelector(
    (state: RootState) => state.listModel,
  );
  const pageSize = 10;
  useEffect(() => {
    getPokemons(pageSize, (page - 1) * pageSize);
  }, [page]);
  if (isFetching && listResults.length <= 0) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        initialNumToRender={listResults.length}
        contentContainerStyle={styles.listContainer}
        data={listResults}
        numColumns={2}
        renderItem={({item, index}: {item: result; index: number}) => (
          <Card index={index} pokemon={item} />
        )}
        refreshing={isFetching}
        onEndReachedThreshold={0.4}
        onEndReached={() =>
          store.dispatch({
            type: SET_PAGE,
            payload: page + 1,
          })
        }
        ListFooterComponent={
          isFetching ? (
            <ActivityIndicator style={styles.listContainer} />
          ) : (
            <View />
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  listContainer: {alignSelf: 'center'},
});