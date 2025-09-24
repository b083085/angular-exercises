import * as fromUser from '../reducers/user.reducer';
import * as UserSelectors from './user.selectors';

describe('User Selectors', () => {
  const initialState: fromUser.UserState = {
    users: [{ id: 1, name: 'Test User', email: 'test@example.com' }],
    loading: false,
    error: null,
    apiLoading: true,
    apiError: 'Test error'
  };

  it('should select all users', () => {
    const result = UserSelectors.selectAllUsers.projector(initialState);
    expect(result).toEqual(initialState.users);
  });

  it('should select loading state', () => {
    const result = UserSelectors.selectUsersLoading.projector(initialState);
    expect(result).toEqual(initialState.loading);
  });

  it('should select error state', () => {
    const result = UserSelectors.selectUsersError.projector(initialState);
    expect(result).toEqual(initialState.error);
  });

  it('should select API loading state', () => {
    const result = UserSelectors.selectApiLoading.projector(initialState);
    expect(result).toEqual(initialState.apiLoading);
  });

  it('should select API error state', () => {
    const result = UserSelectors.selectApiError.projector(initialState);
    expect(result).toEqual(initialState.apiError);
  });
});