import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  //FIXME You should avoid ensuring ts that socket will be initialized private socktet?: Websocket would be more secure
  private socket!: WebSocket;
  //FIXME should this subject be public
  subject = new Subject<string>();

  constructor(private ngZone: NgZone) {}

  public connect(url: string): Observable<string> {
    this.socket = new WebSocket(url);
  //FIXME lack of onClose & onError functions
    this.socket.onmessage = (event) => {
      this.ngZone.run(() => {
        this.subject.next(event.data);
      });
    };

    return this.subject.asObservable();
  }

  public sendMessage(msg: string) {
    if(this.socket && this.socket.readyState === WebSocket.OPEN){
      this.socket.send(msg);
    }
  }

  //FIXME no disconnect option


}
