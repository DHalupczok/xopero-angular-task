import {createAction, props} from '@ngrx/store'
import {UserModel} from 'app/user-list/user-list.component'
//FIXME When creating actions there is somethink called "action hygiene" [User] does not tell anythink - it would be batter to show from where the following action is dispatched
export const setCurrentUser = createAction('[User] Set current user', props<{ user: UserModel }>());
export const addUserToFavorite = createAction('[User] Add user to favorite', props<{ user: UserModel }>());
export const removeUserFromFavorite = createAction('[User] Add user to favorite', props<{ user: UserModel }>());
