import {Component, DestroyRef, inject, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {WebsocketService} from './services/websocket.service'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {environment} from '../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {tap} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  private apiURL = `${environment.websocketsUrl}/notificationHub`;
  private destroyRef = inject(DestroyRef);
  private websocketService = inject(WebsocketService);
  private snackBar = inject(MatSnackBar);

  constructor() {
  }

  ngOnInit() {
    this.websocketService.connect(this.apiURL).pipe(takeUntilDestroyed(this.destroyRef), tap(msg => {
      this.snackBar.open(msg.payload.toLocaleTimeString(), "close", {duration: 5000});
    })).subscribe();
  }

  ngOnDestroy() {
    this.websocketService.disconnect();
  }
}
