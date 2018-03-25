import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {API_URL} from './api.service';

export class Joint {
  code : string;
  name : string;
}

export class routeStation{
  kod : string;
  name : string;
  dorName : string;
  dist : string;
}

export class Route {
  outJointCode : string;
  outJointName : string;
  inJointCode  : string;
  inJointName  : string;
  belDist : string;
  totalDist :string;
  Paragraf :string;
  Error : string;
  Stations : routeStation[];
  inJoints  : Joint[]; // массивы для хранения карманов стыков
  outJoints : Joint[];
}

export class RouteResp { // для JSON c бэка
  out_joint_code : string;
  out_joint_name : string;
  in_joint_code  : string;
  in_joint_name  : string;
  bel_dist : string;
  total_dist :string;
  paragraf :string;
  error : string;
  route : routeStation[];
}

@Injectable()
export class RouteService {
  private _Route : Route;

  constructor(private _http : Http, @Inject(API_URL) private _url: string) {
    this._Route = new Route();
  }

  public get Route() : Route
  {
    return this._Route;
  }

  get(outStation, destStation) : Observable<Route> {
    let _args : string[] = [];
    _args.push('outstationcode=150000'); // код станции отправки
    _args.push('deststationcode=193504'); // код станции назначения
    _args.push('outcountrycode=112'); // код страны отправки
    _args.push('destcountrycode=112'); // код страны назначения
    _args.push('cont=0');
    _args.push('foot=0'); // параметр фут
    _args.push('specialmarkscode=58'); // код тарифных отметок (специальных отметок)
    _args.push('dispatchtype=1'); // код вида отправки
    return this._http.get(this._url + 'route?' + _args.join("&")).map(resp => this.set(resp.json() as RouteResp));
  }

  set(resp : RouteResp) : Route{
    this._Route.outJointCode = resp.out_joint_code;
    this._Route.outJointName = resp.out_joint_name;

    console.log('outJoint = ' + resp.out_joint_name);
    console.log('inJoint  = ' + resp.in_joint_name);

    this._Route.inJointName = resp.in_joint_name;
    this._Route.belDist = resp.bel_dist;
    this._Route.belDist = resp.bel_dist;
    this._Route.totalDist = resp.total_dist;
    this._Route.Paragraf = resp.paragraf;
    this._Route.Stations = [];
    resp.route.forEach(item => this._Route.Stations.push(item));
    return this._Route;
  }

}
