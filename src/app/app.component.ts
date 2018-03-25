import { Component } from '@angular/core';
import { LoginService} from './services/login.service';
import { MapService} from './services/map.service';
import { RouteService, Route} from './services/route.service';
import {GMapModule} from 'primeng/primeng'; 
declare var google: any;//new added line 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  private _mdlUser : string;
  private _mdlPass : string;
  private _mdlGuest : boolean = true;
  options: any;
  overlays : any;
  startStation : string;
  endStation : string;
  bounds : any; 
  count : number = 0;
  route : any[];
  private _outStationCode : number;
  private _destStationCode : number;
  
  constructor(private loginService : LoginService, private _mapService : MapService, private _routeService : RouteService ) {
  }
 
  ngOnInit() {
      this.options = {
          center: {lat: 52.4411761, lng: 30.9878461},
          zoom : 5
      };
    this.bounds = new google.maps.LatLngBounds();
    this.Login();
    }

  setRoute(){
    let points : any[] = [];
    let stations = this._routeService.Route.Stations.map(item => { return this.getShortName(item.name.trim())});
    this._mapService.getCoords(stations).subscribe(resp => {  resp.forEach(item => points.push(item.results[0].geometry.location))})};
    //this._routeService.Route.Stations.forEach(item => { console.log(); this._mapService.getCoord(this.getShortName(item.name.trim())).subscribe();
  

  }

  

  getShortName(s : string){
     let a1 = s.indexOf('-');
     let a2 = s.indexOf(' ');
     let pos;
     if (a1 > 0 || a2 > 0) {
       pos = Math.min(a1,a2);
       if (pos === -1) {
        pos = Math.max(a1,a2);
       }
     }
     return s.substring(0, pos);
    }

  setPoint(point : any){
    this.route.push(point);
    console.log(point);
    this.count = this.count + 1;
    if (this.count === this._routeService.Route.Stations.length){
      this.overlays = [new google.maps.Polyline({path: this.route, geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2})] ; 
    }
  }

  Login(){
    this.loginService.get('guest', '').subscribe(resp => this.loginResp(resp));
  }

  loginResp(resp){
    if (resp.USER !== undefined){ // сесссия получена
        this.loginService.sessionId = resp.USER[0].UUID;
        this.loginService.User = this._mdlUser;
        this.loginService.Pass = this._mdlPass;
    }
  }

  handleClick(event){
    this.route = [];
    this.count = 0;
    this._routeService.get(this._outStationCode,this._destStationCode).subscribe(resp => this.setRoute() );
    //this._mapService.getCoord(this.endStation).subscribe(resp => this.setRoute(resp.results[0].geometry.location)); 
  }

}

