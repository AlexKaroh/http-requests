/* eslint-disable @ngrx/prefix-selectors-with-select */

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './user-auth.domain';

export const userSelector = createFeatureSelector<AuthState>('userAuth');

export const selectErrorMessage = createSelector(
  userSelector,
  (state) => state.errorMessage
);

export const userLoadingSelector = createSelector(
  userSelector,
  (state) => state.status === 'loading'
);

export const userIdSelector = createSelector(
  userSelector,
  (state) => state.user?.id
);

export const userTokenSelector = createSelector(
  userSelector,
  (state) => state.user?.token
);

