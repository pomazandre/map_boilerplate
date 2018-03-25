import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {API_URL_NSI} from './api.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

class Station{
  kod : string;
  name : string;
}

@Injectable()
export class StationService {

	constructor(private _http : Http, @Inject(API_URL_NSI) private _url: string) {
 	}

	getFromName(name : string): Observable<Station[]> {
    return  this._http.get(this._url + 'getStation.php?name=' + name).map(resp => { return resp.json() as Station[] });
  }

getFromKod(kod : string): Observable<Station[]> {
    return  this._http.get(this._url + 'getStation.php?kod=' + kod).map(resp => { return resp.json() as Station[] });
  }

}
