import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  player: any;
  errorsPresent = false;
  errorMessage = "";
  result: any;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.player= {name: "", position: ""}
    this.errorMessage = "";
    this.result = {
      message: "",
      errorMessage: ""
    }
  }
  onSubmit(){

    this.validateData();
    console.log("Result from validateData call: ", this.result)
    if (this.result['message'] == "Too Short"){
      console.log("name too short detected");
      this.errorsPresent = true;
      this.errorMessage = this.result['errorMessage'];
    } else {
      let observerable = this._httpService.findPlayerByName(this.player);
      observerable.subscribe(data => {
        console.log("result from findPlayerByName: data: ", data);
        if (data['data'].length > 0){
          console.log("errors from findPlayerByName: data: ", data)
          this.errorsPresent = true;
          this.errorMessage = "Player already exists";
        } else {
          let observable = this._httpService.addPlayer(this.player);
          observable.subscribe(data => {
            console.log("from add: 1", data);
              if (data['message']=="Error"){
                this.errorsPresent = true;
                this.errorMessage = data['error']['errors']['name']['message'];
              } else {
                this.errorsPresent = false;
                this.errorMessage = "";
                this._router.navigate(['/dashboard']);
              }
          })
        }
      })
    }
  }

  validateData(){
    this.result['message'] = "In validateData";
    this.result['errorMessage'] = "Message from validateData"
    if (this.player['name'].length < 3){
      this.result['message'] = "Too Short";
      this.result['errorMessage'] = "Player name must be at least 3 characters"
    }
    return;
  }
}
