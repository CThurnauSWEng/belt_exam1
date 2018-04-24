import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getPlayers(){
    return this._http.get('/players');
  }

  deletePlayer(id){
    return this._http.delete('/player/'+id);
  }

  addPlayer(player){
    console.log("in service, player: ", player);
    return this._http.post('/player/',player);
  }

  getPlayerById(id){
    console.log("in service getPlayerById, id: ", id);
    return this._http.get('/player/'+id);
  }

  updatePlayerById(player){
    var url_string = '/player/' + player._id;
    return this._http.put(url_string, player)
  }

  findPlayerByName(player){
    console.log("in findPlayerByName: player: ", player)
    var url_string = '/playerName/' + player['name'];
    return this._http.get(url_string);
  }
}


