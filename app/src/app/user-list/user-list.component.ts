import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/user.service';
import {BehaviorSubject, combineLatest, map, share, switchMap} from 'rxjs';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table'
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {WebsocketService} from '../services/websocket.service'
import {Router, RouterLink} from '@angular/router'
import {Store} from '@ngrx/store'
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    RouterLink,
    MatPaginator,
    MatPaginatorModule
  ],
})
export class UserListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSetting$ = new BehaviorSubject<{ page: number, pageSize: number }>({page: 0, pageSize: 10});
  private apiURL = `${environment.websocketsUrl}/notificationHub`;
  private userService = inject(UserService);
  private websocketService = inject(WebsocketService);
  private router = inject(Router);
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private filter$ = new BehaviorSubject<string>("")
  private sort$ = new BehaviorSubject<string>("")
  private params$ = combineLatest([this.filter$, this.pageSetting$, this.sort$])
  private usersResponse$ = this.params$.pipe(switchMap(([filter, pageSettings, sort]) =>
    this.userService.getUsers(filter, pageSettings.page, pageSettings.pageSize, sort)
  ), share())
  public users = toSignal(this.usersResponse$.pipe(map(usersResponse => new MatTableDataSource(usersResponse.results))));
  public total = toSignal(this.usersResponse$.pipe(map(usersResponse => usersResponse.total)));
  public pageSize = toSignal(this.usersResponse$.pipe(map(usersResponse => usersResponse.pageSize)));

  constructor() {
  }

  ngOnInit(): void {
    this.websocketService.connect(this.apiURL).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(msg => {
      console.log("New message:", msg);
    });
  }

  onPageChange(event: PageEvent) {
    const pageSize = event.pageSize;
    const page = event.pageIndex;
    this.pageSetting$.next({page: page + 1, pageSize})
  }
}
