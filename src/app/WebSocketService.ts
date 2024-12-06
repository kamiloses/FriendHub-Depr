import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private stompClient: any;
  private webSocketEndpoint: string = 'http://localhost:8081/ws';

  connect(loggedUser:string |null): void {
    let ws = new SockJS(this.webSocketEndpoint);
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect(
      { 'username': loggedUser },
      (frame: string) => {
        console.log('Connected to STOMP: ' + frame);
      },
      (error: string) => {
        console.error('Connection error: ', error);
      }
    );
  }
}
