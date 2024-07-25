import { User } from '../models/user.model';

export interface AppState {
  user: User;
}

export const initialState: AppState = {
  user: {
    id: '',
    userName: '',
    email: '',
    password: '',
  },
};

export function userReducer(state = initialState, action: any): AppState {
  switch (action.type) {
    case 'updateUser':
      return { ...state, user: { ...action.user } };
    default:
      return state;
  }
}
