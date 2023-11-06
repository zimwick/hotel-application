import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient, HttpResponse,HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  timeString: string = "";
  constructor(private httpClient:HttpClient){}

  private baseURL:string='http://localhost:8080';

  private getUrl:string = this.baseURL + '/room/reservation/v1/';
  private postUrl:string = this.baseURL + '/room/reservation/v1';
  public submitted!:boolean;
  roomsearch! : FormGroup;
  rooms! : Room[];
  request!:ReserveRoomRequest;
  currentCheckInVal!:string;
  currentCheckOutVal!:string;

  public welcomeMessages: WelcomeResponse = { welcomeMessage: [] };
  private welcomeUrl: string = this.baseURL + '/welcome';

    ngOnInit(){
      this.roomsearch= new FormGroup({
        checkin: new FormControl(' '),
        checkout: new FormControl(' ')
      });

      this.getTime().subscribe({
        next: (response) => {
          this.timeString = response.time;  // Store the time string
          console.log("Time:", response.time);
        },
        error: (error) => {
          console.error("Error fetching time:", error);
        }
      });



  // Method to get the time from the backend

 //     this.rooms=ROOMS;
      this.getWelcomeMessages().subscribe({
        next: (response) => {
          this.welcomeMessages = response;  // Store the response
          console.log("Welcome messages:", response.welcomeMessage);
        },
        error: (error) => {
          console.error("Error fetching welcome messages:", error);
        }
      });




    const roomsearchValueChanges$ = this.roomsearch.valueChanges;

    // subscribe to the stream
    roomsearchValueChanges$.subscribe(x => {
      this.currentCheckInVal = x.checkin;
      this.currentCheckOutVal = x.checkout;
    });


  }
  getWelcomeMessages(): Observable<WelcomeResponse> {
    return this.httpClient.get<WelcomeResponse>(this.welcomeUrl);
  }

  getTime(): Observable<TimeResponse> {
    return this.httpClient.get<TimeResponse>(`${this.baseURL}/time`);
  }


    onSubmit({value,valid}:{value:Roomsearch,valid:boolean}){
      this.getAll().subscribe(

        rooms => {console.log(Object.values(rooms)[0]);this.rooms=<Room[]>Object.values(rooms)[0];
          this.rooms.forEach((room) => {
            let intUS: number = parseInt(room.price, 10);
            let intEURO = intUS * 0.93;
            room.priceEUR = intEURO.toFixed(2);

            let intCAD = intUS * 1.37;
            room.priceCAD = intCAD.toFixed(2);
          });}

      );

    }
    reserveRoom(value:string){
      this.request = new ReserveRoomRequest(value, this.currentCheckInVal, this.currentCheckOutVal);

      this.createReservation(this.request);
    }
    createReservation(body:ReserveRoomRequest) {
      let bodyString = JSON.stringify(body); // Stringify payload
      let headers = new Headers({'Content-Type': 'application/json'}); // ... Set content type to JSON
     // let options = new RequestOptions({headers: headers}); // Create a request option

     const options = {
      headers: new HttpHeaders().append('key', 'value'),

    }

      this.httpClient.post(this.postUrl, body, options)
        .subscribe(res => console.log(res));
    }

  /*mapRoom(response:HttpResponse<any>): Room[]{
    return response.body;
  }*/

    getAll(): Observable<any> {


       return this.httpClient.get(this.baseURL + '/room/reservation/v1?checkin='+ this.currentCheckInVal + '&checkout='+this.currentCheckOutVal, {responseType: 'json'});
    }

  }



export interface Roomsearch{
    checkin:string;
    checkout:string;
  }


export interface WelcomeResponse {
  welcomeMessage: string[];
}

export interface TimeResponse {
  time: string;
}

export interface Room{
  id:string;
  roomNumber:string;
  price:string;
  links:string;
  priceCAD:string;
  priceEUR:string;

}
export class ReserveRoomRequest {
  roomId:string;
  checkin:string;
  checkout:string;

  constructor(roomId:string,
              checkin:string,
              checkout:string) {

    this.roomId = roomId;
    this.checkin = checkin;
    this.checkout = checkout;
  }
}

/*
var ROOMS: Room[]=[
  {
  "id": "13932123",
  "roomNumber" : "409",
  "price" :"20",
  "links" : ""
},
{
  "id": "139324444",
  "roomNumber" : "509",
  "price" :"30",
  "links" : ""
},
{
  "id": "139324888",
  "roomNumber" : "609",
  "price" :"40",
  "links" : ""
}
] */

