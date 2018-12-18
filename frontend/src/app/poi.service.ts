import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http'
import { environment } from '../environments/environment';
import { Sight, Legend, Restaurant, POI } from './poi-edit/poi.model';
import { Subject } from 'rxjs';
import * as moment from 'moment'


const timePattern = /([1-9]|0[1-9]|1[0-2]):([0-5][0-9]) (am|pm)/g

const getTimestamp = (date, time) => {
  const parsedTime = timePattern.exec(time)
  if (!parsedTime) {
    throw 'Invalid time string'
  }
  const dayTimeSec = parseInt(parsedTime[1], 10) * 3600 + parseInt(parsedTime[2], 10) * 60 + (parsedTime[3] === 'pm' ? 12 * 3600 : 0)
  return moment(date).startOf('day').unix() + dayTimeSec
}

const mapPOIData = poi => {
  const {publishImmediately, publishingDate, publishingTime, ...poiData} = poi
  return publishImmediately ?
    {publishingTimestamp: moment().unix(), ...poiData} :
    {publishingTimestamp: getTimestamp(publishingDate, publishingTime), ...poiData}
}


@Injectable({
  providedIn: 'root'
})
export class PoiService {

  poiFetched = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  retrievePOIs = (type?: String) => this.http.get(`${environment.backendUrl}poi/${type ? `${type}/` : ''}`)

  /**
   * TODO: Create model for POI
   */

  getPOI = (key: string) => this.http.get<POI>(`${environment.backendUrl}poi/key/${key}`)

  postPOI = (poi: POI) => {
    const req = new HttpRequest('POST', `${environment.backendUrl}poi`, this.createFormData(poi), {
      reportProgress: true
    });
    return this.http.request(req);
  };

  putPOI = (poi: Restaurant | Legend | Sight) => {
    const req = new HttpRequest('PUT', `${environment.backendUrl}poi`, this.createFormData(poi), {
      reportProgress: true
    });

    return this.http.request(req);
  }

  getContents = (key: string) => this.http.get<any>(`${environment.backendUrl}poi/content/${key}`);

  putContents = (contents, key) => this.http.put<any>(`${environment.backendUrl}poi/content/${key}`, contents);

  private createFormData = (poi): FormData => {
    const postData = new FormData();
    postData.append('poi', JSON.stringify(mapPOIData(poi)));
    postData.append('icon_default', poi.icons.default);
    postData.append('icon_explored', poi.icons.explored);
    postData.append('image_preview', poi.media.image.preview);
    postData.append('video_ar_scene', poi.media.video.arScene);
    postData.append('video_icon_scene', poi.media.video.iconScene);
    poi.media.vuforiaTargets.forEach(file => {
      postData.append('vuforia_targets', file);
    })
    return postData;
  }
}
