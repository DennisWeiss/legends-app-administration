import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


interface Beacon {
  name: string,
  beaconId: number
}

interface Response {
  message: string,
  beacon: Beacon
}

@Injectable({
  providedIn: 'root'
})

export class BeaconService {

  constructor(private http: HttpClient ) { }


  getBeacon(beaconId): Observable<Beacon> {
    return this.http.get<Beacon>(`${environment.backendUrl}beacon/${beaconId}`);
  }

  addBeacon(name, beaconId): Observable<Response> {
    return this.http.post<Response>(`${environment.backendUrl}beacon`, {name, beaconId});
  }

  deleteBeacon(beaconId): Observable<Response> {
    return this.http.delete<Response>(`${environment.backendUrl}beacon/${beaconId}`);
  }

  changeBeacon(beacon): Observable<Response> {
    return this.http.put<Response>(`${environment.backendUrl}beacon`, beacon);
  }


}
