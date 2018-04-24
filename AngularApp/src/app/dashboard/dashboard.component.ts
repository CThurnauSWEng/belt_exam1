import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  players = [];
  playerDataAvailable = false;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    console.log("1");
    this.getPlayersFromService();
  }

  getPlayersFromService(){
    console.log("called getPlayersFromService")
    let observable = this._httpService.getPlayers();
    observable.subscribe(data => {
      console.log("Got players in component: ", data);
      if(data['message']=="Success"){
        console.log("success in componennt get players")
        this.players = data['data'];
        console.log("authors: ", this.players)
        this.playerDataAvailable = true;
      } else {
        console.log("Error reported to component")
      }
    })
  }

}


