import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectUsersLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectUsersError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

// API selectors
export const selectApiLoading = createSelector(
  selectUserState,
  (state: UserState) => state.apiLoading
);

export const selectApiError = createSelector(
  selectUserState,
  (state: UserState) => state.apiError
);