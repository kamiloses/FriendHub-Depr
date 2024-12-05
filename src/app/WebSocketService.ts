import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private stompClient: any;
  private webSocketEndpoint: string = 'http://localhost:8084/ws';



  connect(): void {
    console.log("łącze")
    let ws=SockJS(this.webSocketEndpoint);
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect({}, (frame: string) => {
      console.log('Connected to STOMP: ' + frame);
    }, (error: string) => {
      console.error('Connection error: ', error);
    });
  }



}
