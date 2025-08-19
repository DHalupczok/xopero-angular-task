import {Component, DestroyRef, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {WebsocketService} from './services/websocket.service'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app';
  private apiURL = `${environment.websocketsUrl}/notificationHub`;
  private destroyRef = inject(DestroyRef);
  private websocketService = inject(WebsocketService);

  constructor() {
  }

  ngOnInit() {
    this.websocketService.connect(this.apiURL).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(msg => {
      console.log("New message:", msg);
    });
  }
}
