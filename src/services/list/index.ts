import {api} from '../index';
import {store} from '../../store';
import {SET_ERROR, SET_FETCHING, SET_LIST} from '../../store/list';
export const getPokemons = async (limit: number, offset: number) => {
  let response;
  try {
    store.dispatch({
      type: SET_FETCHING,
      payload: true,
    });
    response = await api.get(`pokemon?limit=${limit}&offset=${offset}`);
    store.dispatch({
      type: SET_LIST,
      payload: response.data.results,
    });
  } catch (error: any) {
    store.dispatch({
      type: SET_ERROR,
      payload: {
        isError: true,
        messgae: error?.response?.data?.message || error.message,
        code: error?.response?.data?.code || error.code,
      },
    });
  }
};
