import {createAction, createReducer} from '@reduxjs/toolkit';
import {errorType} from '../../types';
export const SET_DETAILS = 'SET_DETAILS';
export const SET_FETCHING_DETAILS = 'SET_FETCHING_DETAILS';
export const SET_ERROR_DETAILS = 'SET_ERROR_DETAILS';

interface detailsStateTypes {
  details: any;
  isFetching: boolean;
  error: errorType;
}

const initialState: detailsStateTypes = {
  details: {},
  isFetching: false,
  error: {
    isError: false,
    message: '',
    code: '',
  },
};

const setDetails = createAction<detailsStateTypes, typeof SET_DETAILS>(
  SET_DETAILS,
);
const setFetching = createAction<boolean, typeof SET_FETCHING_DETAILS>(
  SET_FETCHING_DETAILS,
);
const setError = createAction<boolean, typeof SET_ERROR_DETAILS>(
  SET_ERROR_DETAILS,
);
export const detailsModel = createReducer(initialState, builder => {
  builder.addCase(setDetails, (state, action: any) => {
    state.details = action.payload;
    state.isFetching = false;
    state.error = {
      isError: false,
      message: '',
      code: '',
    };
  });
  builder.addCase(setFetching, (state, action) => {
    state.isFetching = action.payload;
  });
  builder.addCase(setError, (state, action: any) => {
    state.isFetching = false;
    state.error = action.payload;
  });
});
