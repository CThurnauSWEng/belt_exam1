webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/add/add.component.css":
/***/ (function(module, exports) {

module.exports = "* {\n    margin: 15px;\n    padding: 0px;\n    font-family: sans-serif;\n}\ntable {\n    border-collapse: collapse;\n}\ntable, th, td{\n    border: 1px solid black;\n    padding: 5px 20px 5px 10px;\n    vertical-align: center;\n}\nth {\n    background-color: rgb(211, 211, 211);\n    color: white;\n    text-align: left;\n}\ntr:nth-child(even) {\n    background-color: rgb(211, 211, 211)\n}\n.purpleText {\n    color: rgb(118, 24, 244);\n}\nh1 {\n    text-align: left;\n}\nbutton {\n    text-align: center;\n    border-radius: 5px;\n    color: white;\n    width: 90px;\n    height: 1.7em;\n    padding: 10px 0px 32px 0px;\n    font-size: 1.1em;\n    margin: 0;\n}\n.greyButton {\n    background-color: rgb(137, 156, 172);\n}\n.brownButton {\n    background-color: rgb(185, 178, 168);\n}\n.blueButton {\n    background-color: rgb(103, 188, 249)\n}\n.mauveButton {\n    background-color: rgb(203, 177, 179);\n}\np {\n    margin-left: 20px;\n}\n.formDiv {\n    padding: 5px;\n    height: auto;\n    width: auto;\n    display: inline-block;\n    vertical-align: top;\n    border: 1px solid black;\n}\nlabel {\n    display: block;\n}\ninput {\n    display: block;\n    font-size: 1.1em;\n    padding-bottom: 10px;\n}\n.subButton {    \n    color: white;\n    padding: 10px 0px 10px 0px;\n    width: 90px;\n    border-radius: 5px; \n    margin-left: 0px 0px 0px 5px;  \n}\n.buttonDiv, .subButton {\n    display: inline-block;\n    vertical-align: top;\n    font-size: 1.1em;\n    font-style: bold;\n    margin: 0px 0px 0px 5px;\n}\n.buttonDiv {\n    margin-left: 20px;\n}\n\n"

/***/ }),

/***/ "./src/app/add/add.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"formDiv\">\n  <form (submit)=\"onSubmit()\">\n      <label>Name:</label>\n      <input type=\"text\" name=\"player.name\" [(ngModel)]=\"player.name\" />\n      <input type=\"text\" name=\"player.position\" [(ngModel)]=\"player.position\" />\n      <p *ngIf=\"errorsPresent\">Error: {{ errorMessage }}</p>\n      <div class=\"buttonDiv\">\n          <button [routerLink]=\"['/dashboard']\" class=\"blueButton\">Cancel</button>\n          <input class=\"blueButton subButton\" type=\"submit\" value=\"Submit\" />\n      </div>\n  </form>\n</div>\n"

/***/ }),

/***/ "./src/app/add/add.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_service_1 = __webpack_require__("./src/app/http.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var AddComponent = /** @class */ (function () {
    function AddComponent(_httpService, _route, _router) {
        this._httpService = _httpService;
        this._route = _route;
        this._router = _router;
        this.errorsPresent = false;
        this.errorMessage = "";
    }
    AddComponent.prototype.ngOnInit = function () {
        this.player = { name: "", position: "" };
        this.errorMessage = "";
        this.result = {
            message: "",
            errorMessage: ""
        };
    };
    AddComponent.prototype.onSubmit = function () {
        var _this = this;
        this.validateData();
        console.log("Result from validateData call: ", this.result);
        if (this.result['message'] == "Too Short") {
            console.log("name too short detected");
            this.errorsPresent = true;
            this.errorMessage = this.result['errorMessage'];
        }
        else {
            var observerable = this._httpService.findPlayerByName(this.player);
            observerable.subscribe(function (data) {
                console.log("result from findPlayerByName: data: ", data);
                if (data['data'].length > 0) {
                    console.log("errors from findPlayerByName: data: ", data);
                    _this.errorsPresent = true;
                    _this.errorMessage = "Player already exists";
                }
                else {
                    var observable = _this._httpService.addPlayer(_this.player);
                    observable.subscribe(function (data) {
                        console.log("from add: 1", data);
                        if (data['message'] == "Error") {
                            _this.errorsPresent = true;
                            _this.errorMessage = data['error']['errors']['name']['message'];
                        }
                        else {
                            _this.errorsPresent = false;
                            _this.errorMessage = "";
                            _this._router.navigate(['/dashboard']);
                        }
                    });
                }
            });
        }
    };
    AddComponent.prototype.validateData = function () {
        this.result['message'] = "In validateData";
        this.result['errorMessage'] = "Message from validateData";
        if (this.player['name'].length < 3) {
            this.result['message'] = "Too Short";
            this.result['errorMessage'] = "Player name must be at least 3 characters";
        }
        return;
    };
    AddComponent = __decorate([
        core_1.Component({
            selector: 'app-add',
            template: __webpack_require__("./src/app/add/add.component.html"),
            styles: [__webpack_require__("./src/app/add/add.component.css")]
        }),
        __metadata("design:paramtypes", [http_service_1.HttpService, router_1.ActivatedRoute,
            router_1.Router])
    ], AddComponent);
    return AddComponent;
}());
exports.AddComponent = AddComponent;


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var add_component_1 = __webpack_require__("./src/app/add/add.component.ts");
var dashboard_component_1 = __webpack_require__("./src/app/dashboard/dashboard.component.ts");
var routes = [
    { path: 'add', component: add_component_1.AddComponent },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;


/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>Hard Coded Title</h1>\n<a [routerLink]=\"['add']\">Add Player</a>\n\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_service_1 = __webpack_require__("./src/app/http.service.ts");
var AppComponent = /** @class */ (function () {
    function AppComponent(_httpService) {
        this._httpService = _httpService;
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [http_service_1.HttpService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var app_routing_module_1 = __webpack_require__("./src/app/app-routing.module.ts");
var app_component_1 = __webpack_require__("./src/app/app.component.ts");
var add_component_1 = __webpack_require__("./src/app/add/add.component.ts");
var dashboard_component_1 = __webpack_require__("./src/app/dashboard/dashboard.component.ts");
var http_service_1 = __webpack_require__("./src/app/http.service.ts");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js"); // <-- import FormsModule.
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                add_component_1.AddComponent,
                dashboard_component_1.DashboardComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                forms_1.FormsModule
            ],
            providers: [http_service_1.HttpService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app/dashboard/dashboard.component.css":
/***/ (function(module, exports) {

module.exports = "* {\n    margin: 15px;\n    padding: 0px;\n    font-family: sans-serif;\n  }\ntable {\n    border-collapse: collapse;\n}\ntable, th, td{\n    border: 1px solid black;\n    padding: 5px 20px 5px 10px;\n    vertical-align: center;\n}\nth {\n    background-color: rgb(211, 211, 211);\n    color: white;\n    text-align: left;\n}\ntr:nth-child(even) {\n    background-color: rgb(211, 211, 211)\n}\n.purpletext {\n    color: rgb(118, 24, 244);\n}\nh1 {\n    text-align: left;\n}\nbutton {\n    text-align: center;\n    border-radius: 5px;\n    color: white;\n    width: 90px;\n    height: 1.7em;\n    padding: 10px 0px 25px 0px;\n    \n}\n.greyButton {\n    background-color: rgb(137, 156, 172);\n}\n.brownButton {\n    background-color: rgb(185, 178, 168);\n}"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "\n\n<div *ngIf=\"playerDataAvailable\">\n  <table>\n    <thead>\n      <tr>\n        <th>Player</th>\n        <th>Position</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let player of players\">\n        <td>{{player.name}}</td>\n        <td>{{player.position}}</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n\n"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_service_1 = __webpack_require__("./src/app/http.service.ts");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(_httpService) {
        this._httpService = _httpService;
        this.players = [];
        this.playerDataAvailable = false;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        console.log("1");
        this.getPlayersFromService();
    };
    DashboardComponent.prototype.getPlayersFromService = function () {
        var _this = this;
        console.log("called getPlayersFromService");
        var observable = this._httpService.getPlayers();
        observable.subscribe(function (data) {
            console.log("Got players in component: ", data);
            if (data['message'] == "Success") {
                console.log("success in componennt get players");
                _this.players = data['data'];
                console.log("authors: ", _this.players);
                _this.playerDataAvailable = true;
            }
            else {
                console.log("Error reported to component");
            }
        });
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            template: __webpack_require__("./src/app/dashboard/dashboard.component.html"),
            styles: [__webpack_require__("./src/app/dashboard/dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [http_service_1.HttpService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;


/***/ }),

/***/ "./src/app/http.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var HttpService = /** @class */ (function () {
    function HttpService(_http) {
        this._http = _http;
    }
    HttpService.prototype.getPlayers = function () {
        return this._http.get('/players');
    };
    HttpService.prototype.deletePlayer = function (id) {
        return this._http.delete('/player/' + id);
    };
    HttpService.prototype.addPlayer = function (player) {
        console.log("in service, player: ", player);
        return this._http.post('/player/', player);
    };
    HttpService.prototype.getPlayerById = function (id) {
        console.log("in service getPlayerById, id: ", id);
        return this._http.get('/player/' + id);
    };
    HttpService.prototype.updatePlayerById = function (player) {
        var url_string = '/player/' + player._id;
        return this._http.put(url_string, player);
    };
    HttpService.prototype.findPlayerByName = function (player) {
        console.log("in findPlayerByName: player: ", player);
        var url_string = '/playerName/' + player['name'];
        return this._http.get(url_string);
    };
    HttpService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;


/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("./src/app/app.module.ts");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map