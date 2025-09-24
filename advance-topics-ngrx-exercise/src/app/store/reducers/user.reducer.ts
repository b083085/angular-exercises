import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import * as UserActions from '../actions/user.actions';

export interface UserState {
  users: User[];
  loading: boolean;
  error: any;
  apiLoading: boolean;
  apiError: any;
}

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  apiLoading: false,
  apiError: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  // Handle API fetch actions
  on(UserActions.fetchUsers, state => ({
    ...state,
    apiLoading: true,
    apiError: null
  })),
  on(UserActions.fetchUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    apiLoading: false
  })),
  on(UserActions.fetchUsersFailure, (state, { error }) => ({
    ...state,
    apiError: error,
    apiLoading: false
  }))
);