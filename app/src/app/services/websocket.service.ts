import {inject, Injectable, NgZone} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {


  private subject = new Subject<string>();
  public messages = this.subject.asObservable()
  private ngZone = inject(NgZone);
  private socket?: WebSocket;

  constructor() {
  }

  public connect(url: string): Observable<string> {
    this.socket = new WebSocket(url);
    this.socket.onmessage = (event) => {
      this.ngZone.run(() => {
        this.subject.next(event.data);
      });
    };

    return this.subject.asObservable();

  }

  public sendMessage(msg: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(msg);
    }
  }

  public disconnect() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.close();
    }
  }


}
