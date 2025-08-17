import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable, MatTableDataSource,
} from '@angular/material/table'
import { WebsocketService } from '../services/websocket.service'
import {Router} from '@angular/router'
import {Store} from '@ngrx/store'
import {setCurrentUser} from '../store/store.actions'
//FIXME maybe dont store model inside component
export interface UserModel {
  //FIXME avoid using any
  id: number | string
  name: any
  role: any
  email: any
  protectedProjects: number
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
  ],
})
export class UserListComponent implements OnInit {
  //FIXME don't use any
  users: any
  //FIXME Why are you creating these variables if You are not using them.
  //1. If you want to use these subs use userSub? and check if exist while using
  //2. You should unsubscribe - either do this for every sub in ngOnDestroy or create a sub array and iterate over this array in ngOnDestroy to undubscribe
  //3. Alternatively You can use takeUntilDestroyed oparator while subscribing.
  private userSub!: Subscription;
  private wsSub!: Subscription;

  //TODO think about using inject function
  constructor(
    //FIXME why services are public ???
    public userService: UserService,
    public websocketService: WebsocketService,
    public router: Router,
    public store: Store,
  ) { }

  ngOnInit(): void {
    this.loadUsers();

    this.wsSub = this.websocketService.connect('ws://localhost:9334/notificationHub').subscribe(msg => {
      console.log("New message:", msg);
    });
  }
  //FIXME instead of creating users variable You can create abservable and use asyng pipe in the template
  loadUsers() {
    this.userSub = this.userService.getUsers().subscribe(data => {
      this.users = new MatTableDataSource(data);
    });
  }
  //FIXME this method name does not tell anythink - also this method is braking separation of concerns
  //If after change of current user redirect should occur it is a good idea to move it to effect
  userDetails(user: UserModel) {
    this.store.dispatch(setCurrentUser({user}))
    this.router.navigate([user.id])
  }
}
