import { createAction } from 'typesafe-actions';

export const setLoading = createAction( 'LOADING_SET', (isLoading: boolean) => isLoading)();

export const setToken = createAction( 'SET_TOKEN', (token: string) => token)();
