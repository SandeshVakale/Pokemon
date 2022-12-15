import {createAction, createReducer} from '@reduxjs/toolkit';
import {OfficialArtwork} from '../../utils/officialArtwork';
export const SET_LIST = 'SET_LIST';
export const SET_PAGE = 'SET_PAGE';
export const SET_FETCHING = 'SET_FETCHING';
export const SET_ERROR = 'SET_ERROR';

export interface result {
  name: string;
  url: string;
}

interface errorType {
  isError: boolean;
  message: string;
  code: string;
}

interface listStateTypes {
  listResults: result[];
  isFetching: boolean;
  error: errorType;
  page: number;
}

const initialState: listStateTypes = {
  listResults: [],
  isFetching: false,
  error: {
    isError: false,
    message: '',
    code: '',
  },
  page: 1,
};

const setList = createAction<listStateTypes, typeof SET_LIST>(SET_LIST);
const setPage = createAction<number, typeof SET_PAGE>(SET_PAGE);
const setFetching = createAction<boolean, typeof SET_FETCHING>(SET_FETCHING);
const setError = createAction<boolean, typeof SET_ERROR>(SET_ERROR);
export const listModel = createReducer(initialState, builder => {
  builder.addCase(setList, (state, action: any) => {
    if (state.page === initialState.page) {
      action.payload.map(
        (item: result, index: number) =>
          (action.payload[index].url = OfficialArtwork(
            item.url.substring(
              item.url.lastIndexOf('pokemon/') + 8,
              item.url.lastIndexOf('/'),
            ),
          )),
      );
      state.listResults = action.payload;
    } else {
      action.payload.map(
        (item: result, index: number) =>
          (action.payload[index].url = OfficialArtwork(
            item.url.substring(
              item.url.lastIndexOf('pokemon/') + 8,
              item.url.lastIndexOf('/'),
            ),
          )),
      );
      state.listResults = [...state.listResults, ...action.payload];
    }
    state.isFetching = false;
    state.error = {
      isError: false,
      message: '',
      code: '',
    };
  });
  builder.addCase(setPage, (state, action) => {
    state.page = action.payload;
  });
  builder.addCase(setFetching, (state, action) => {
    state.isFetching = action.payload;
  });
  builder.addCase(setError, (state, action: any) => {
    state.isFetching = false;
    state.error = action.payload;
  });
});
