import {inject, Injectable, NgZone} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ReceiveMessageModel} from '../models/receiveMessage.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {


  private subject = new Subject<ReceiveMessageModel>();
  public messages = this.subject.asObservable()
  private ngZone = inject(NgZone);
  private socket?: WebSocket;

  constructor() {
  }

  public connect(url: string): Observable<ReceiveMessageModel> {
    this.socket = new WebSocket(url);
    this.socket.onmessage = (event) => {
      this.ngZone.run(() => {
        const {type, payload} = JSON.parse(event.data);
        this.subject.next({type, payload: new Date(payload)});
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
