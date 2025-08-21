import {ChangeDetectionStrategy, Component, computed, inject, OnDestroy, OnInit} from '@angular/core'
import {WebsocketService} from '../services/websocket.service'
import {ActivatedRoute, RouterLink} from '@angular/router'
import {filter, Subscription, switchMap} from 'rxjs'
import {Store} from '@ngrx/store'
import {
  addUserToFavoriteInUserComponent,
  removeUserFromFavoriteInUserComponent,
  setCurrentUserInUserComponent
} from 'app/store/store.actions'
import {selectCurrentUser, selectFavoriteUsers, selectIsFavoriteUser} from 'app/store/store.selectors'
import {CommonModule} from '@angular/common'
import {toSignal} from '@angular/core/rxjs-interop';
import {UserService} from '../services/user.service';
import {I18NextPipe} from 'angular-i18next';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss'],
  imports: [CommonModule, RouterLink, I18NextPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit, OnDestroy {

  userId = computed(() => {
    const user = this.user()
    return user ? user.id : ''
  })
  userName = computed(() => {
    const user = this.user();
    return user ? user.name : ''
  })
  protectedProjects = computed(() => {
    const user = this.user();
    return user ? user.protectedProjects : 0
  })
  private subscriptions: Subscription[] = [];
  private webSocketService = inject(WebsocketService);
  private userService = inject(UserService)
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  user = toSignal(this.store.select(selectCurrentUser).pipe(filter(user => !!user)));
  favoriteUsers = toSignal(this.store.select(selectFavoriteUsers), {initialValue: []})
  isUserFavorite = toSignal(this.store.select(selectIsFavoriteUser).pipe())

  constructor() {
  }

  ngOnInit() {
    //Perfect would be to install ngrx/effects and use route => dispatchAction => effectWhichFetchesDataViaService => DispatchAction => changeState
    this.subscriptions.push(this.route.params.pipe(switchMap(params => this.userService.getUser(params['id'])))
      .subscribe(user => {
        if (user)
          this.store.dispatch(setCurrentUserInUserComponent({user}))
      }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  synchronizeUser() {
    const message = JSON.stringify({
      type: 'SynchronizeUser',
      payload: this.userName,
    })
    this.webSocketService.sendMessage(message)
  }

  removeFromFavorites() {
    const user = this.user();
    if (user) this.store.dispatch(removeUserFromFavoriteInUserComponent({user}))
  }

  addToFavorites() {
    const user = this.user();
    if (user) this.store.dispatch(addUserToFavoriteInUserComponent({user}))
  }
}
