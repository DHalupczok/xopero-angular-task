import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from './store.reducer'

export const selectCounterState = createFeatureSelector<State>('user');

export const selectCurrentUser = createSelector(
  selectCounterState,
  (state) => state.currentUser
);

export const selectFavoriteUsers = createSelector(
  selectCounterState,
  (state) => {
    console.log("TRALALALa", state)
    return state.favoriteUsers
  }
);

export const selectIsFavoriteUser = createSelector(
  selectFavoriteUsers,
  selectCurrentUser,
  (favoriteUsers, currentUser) => {
    if (!currentUser) return false
    return !!favoriteUsers.find(u => u.id === currentUser.id)
  }
)

