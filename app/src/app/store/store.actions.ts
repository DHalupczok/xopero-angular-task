import {createAction, props} from '@ngrx/store'
import {UserModel} from 'app/models/user.model'

export const setCurrentUserInUserComponent = createAction('[User Component] Set current user', props<{
  user: UserModel
}>());
export const addUserToFavoriteInUserComponent = createAction('[User Component] Add user to favorite', props<{
  user: UserModel
}>());
export const removeUserFromFavoriteInUserComponent = createAction('[User Component] Remove user from favorite', props<{
  user: UserModel
}>());
