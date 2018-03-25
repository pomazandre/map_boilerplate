import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {API_URL} from './api.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

class testLogin{
  result : string;
}

@Injectable()
export class LoginService {
	private User_ : string = '';
	private Pass_ : string = '';
  private sessionId_ : string = '';

  constructor(private _http : Http, @Inject(API_URL) private _url: string) {
  }

  public set User(value: string)
  {
    this.User_ = value;
  }

  public get User() : string
  {
    return this.User_;
  }

  public set Pass(value: string)
  {
    this.Pass_ = value;
  }

  public get Pass() : string
  {
    return this.Pass_;
  }

  public set sessionId(value: string)
  {
    this.sessionId_ = value;
  }

  public get sessionId() : string
  {
    return this.sessionId_;
  }

	get(user, pass : string) : Observable<testLogin> {
		return this._http.get(this._url + 'login?user=' + user + '&password=' + pass).map(resp => { return resp.json() });
	}

}
