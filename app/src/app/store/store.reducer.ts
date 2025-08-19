import {createReducer, on} from '@ngrx/store';
import {
  addUserToFavoriteInUserComponent,
  removeUserFromFavoriteInUserComponent,
  setCurrentUserInUserComponent
} from './store.actions'
import {UserModel} from 'app/models/user.model'

export interface State {
  userAmount: number
  currentUser: UserModel | null
  favoriteUsers: UserModel[]
}

export const initialState: State = {
  userAmount: 0,
  currentUser: null,
  favoriteUsers: [],
};

export const userReducer = createReducer(
  initialState,
  on(setCurrentUserInUserComponent, (state, {user}) => ({
    ...state,
    currentUser: user,
  })),
  on(addUserToFavoriteInUserComponent, (state, {user}) => ({
    ...state,
    favoriteUsers: [...state.favoriteUsers, user]
  })),
  on(removeUserFromFavoriteInUserComponent, (state, {user}) => ({
    ...state,
    favoriteUsers: state.favoriteUsers.filter((u) => u.id !== u.id)
  }))
);
