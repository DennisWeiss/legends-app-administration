import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Beacon } from '../models/beacon.model';


interface Response {
  message: string,
  beacon: Beacon
}

@Injectable({
  providedIn: 'root'
})

export class BeaconService {

  constructor(private http: HttpClient ) { }

  getBeacons(): Observable<Beacon[]> {
    return this.http.get<Beacon[]>(`${environment.backendUrl}beacon`);
  }

  getBeacon(beaconId: number): Observable<Beacon> {
    return this.http.get<Beacon>(`${environment.backendUrl}beacon/${beaconId}`);
  }

  addBeacon(beacon: Beacon): Observable<Response> {
    return this.http.post<Response>(`${environment.backendUrl}beacon`, beacon);
  }

  deleteBeacon(beaconId: number): Observable<Response> {
    return this.http.delete<Response>(`${environment.backendUrl}beacon/${beaconId}`);
  }

  changeBeacon(beacon: Beacon): Observable<Response> {
    return this.http.put<Response>(`${environment.backendUrl}beacon/${beacon.beaconId}`, beacon);
  }


}
