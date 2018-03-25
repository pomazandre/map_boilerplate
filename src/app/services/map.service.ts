import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {API_URL_MAP, MAP_KEY} from './api.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { forkJoin } from 'rxjs/observable/forkJoin';

class Point {
  x : number;
  y : number;
}

@Injectable()
export class MapService {

  constructor(private _http:Http, @Inject(API_URL_MAP) private _url: string, @Inject(MAP_KEY) private _key: string) {
  }
  
  getCoord(station : string) : Observable<Response> {
    return this._http.get(encodeURI(this._url + station + '&key=' + this._key)).map(resp => {return resp.json();});
  }

  getCoords(stations : any[]) : Observable<any>{
   return forkJoin( stations.map(item => { return this.getCoord(item) }));
} 

}
