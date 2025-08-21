import {Component, DestroyRef, inject, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {WebsocketService} from './services/websocket.service'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {environment} from '../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {tap} from 'rxjs';
import {I18NEXT_SERVICE} from 'angular-i18next';

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
  private i18next = inject(I18NEXT_SERVICE);

  constructor() {
  }

  ngOnInit() {
    this.websocketService.connect(this.apiURL).pipe(takeUntilDestroyed(this.destroyRef), tap(msg => {
      this.snackBar.open(msg.payload.toLocaleTimeString(this.i18next.language || 'en'), this.i18next.t("close"), {duration: 5000});
    })).subscribe();
  }

  ngOnDestroy() {
    this.websocketService.disconnect();
  }
}
