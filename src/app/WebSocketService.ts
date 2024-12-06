import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private stompClient: any;
  //private webSocketEndpoint: string = 'http://localhost:8084/ws';

  connect(loggedUser:string |null): void {
    let ws = new SockJS('http://localhost:8084/ws');
    this.stompClient = Stomp.over(ws);


    this.stompClient.connect(
      { 'username': loggedUser },
      (frame: string) => {
        console.log('Connected to STOMP: ' + frame);
        this.stompClient.send('/app/chat.activeFriends', {},loggedUser);



        this.stompClient.subscribe('/topic/public/friendsOnline', (message: any) => {
          this.onFriendsOnlineUpdate(message);
        });

      },
      (error: string) => {
        console.error('Connection error: ', error);
      }
    );
  }





  private onFriendsOnlineUpdate(message: any): void {
    const friendsOnline: string[] = JSON.parse(message.body);
    console.log('Received friends online data: ', friendsOnline);

    this.updateFriendsOnlineList(friendsOnline);
  }

  private updateFriendsOnlineList(friendsOnline: string[]): void {
    console.log('Friends Online:', friendsOnline);
  }

}
