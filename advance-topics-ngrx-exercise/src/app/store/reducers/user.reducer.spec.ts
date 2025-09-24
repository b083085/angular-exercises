import { userReducer, initialState } from './user.reducer';
import * as UserActions from '../actions/user.actions';

describe('User Reducer', () => {
  it('should return the default state', () => {
    const action = { type: 'NOOP' } as any;
    const result = userReducer(undefined, action);
    expect(result).toBe(initialState);
  });

  it('should set loading to true on loadUsers', () => {
    const action = UserActions.loadUsers();
    const result = userReducer(initialState, action);
    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('should update users and set loading to false on loadUsersSuccess', () => {
    const users = [{ id: 1, name: 'Test User', email: 'test@example.com' }];
    const action = UserActions.loadUsersSuccess({ users });
    const result = userReducer(initialState, action);
    expect(result.users).toEqual(users);
    expect(result.loading).toBe(false);
  });

  it('should set error and loading to false on loadUsersFailure', () => {
    const error = 'Error loading users';
    const action = UserActions.loadUsersFailure({ error });
    const result = userReducer(initialState, action);
    expect(result.error).toEqual(error);
    expect(result.loading).toBe(false);
  });

  it('should set apiLoading to true on fetchUsers', () => {
    const action = UserActions.fetchUsers();
    const result = userReducer(initialState, action);
    expect(result.apiLoading).toBe(true);
    expect(result.apiError).toBeNull();
  });

  it('should update users and set apiLoading to false on fetchUsersSuccess', () => {
    const users = [{ id: 1, name: 'API User', email: 'api@example.com' }];
    const action = UserActions.fetchUsersSuccess({ users });
    const result = userReducer(initialState, action);
    expect(result.users).toEqual(users);
    expect(result.apiLoading).toBe(false);
  });

  it('should set apiError and apiLoading to false on fetchUsersFailure', () => {
    const error = 'API Error';
    const action = UserActions.fetchUsersFailure({ error });
    const result = userReducer(initialState, action);
    expect(result.apiError).toEqual(error);
    expect(result.apiLoading).toBe(false);
  });
});