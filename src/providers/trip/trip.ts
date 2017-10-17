import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthProvider } from '../auth/auth';
import { EnvVariables } from '../../app/environment-variables/environment-variables.token';
import 'rxjs/add/operator/map';

@Injectable()
export class TripProvider {

  public apiURL: any;

  constructor(
    public http: Http,
    public authService: AuthProvider,
    @Inject(EnvVariables) public envVariables) {
      this.apiURL = envVariables.apiEndpoint + "api/trips/";
  }

  public createTrip(data): any{
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post(this.apiURL, JSON.stringify(data), {headers:headers})
        .subscribe(res => {
          let data = res.json();
          resolve(data);
        }, (err) => {
          reject(err);
        });

    });
  }

  public currentTrips(): any{
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get(this.apiURL + "me/active", {headers: headers})
        .subscribe(res => {
          let user = res.json();
          resolve(user);
        }, (err) => {
          reject(err);
        });
    })
  }

  public nearTrips(data): any{
    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.put(this.apiURL + "near", JSON.stringify(data), {headers:headers})
        .subscribe(res => {
          let data = res.json();
          resolve(data.trips);
        }, (err) => {
          reject(err);
        })
    })
  }

}
