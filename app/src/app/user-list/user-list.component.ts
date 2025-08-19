import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {map} from 'rxjs';
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
  MatTableDataSource,
} from '@angular/material/table'
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
  ],
})
export class UserListComponent implements OnInit {

  private apiURL = `${environment.websocketsUrl}/notificationHub`;
  private userService = inject(UserService);
  public users = toSignal(this.userService.getUsers().pipe(map(data => new MatTableDataSource(data))))
  private websocketService = inject(WebsocketService);
  private router = inject(Router);
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  constructor() {
  }

  ngOnInit(): void {
    this.websocketService.connect(this.apiURL).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(msg => {
      console.log("New message:", msg);
    });
  }
}
