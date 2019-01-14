import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http'
import { environment } from '../../../environments/environment';
import { Sight, Legend, Restaurant, POI } from '../../poi-edit/poi.model';
import { Subject } from 'rxjs';
import * as moment from 'moment'
import {getTimestamp} from "../../utils/helperfunctions";


/**
 *  Mapper to include publishingTimestamp in POI-objekt
 * @param poi
 */

const mapPOIData = poi => {
  const {publishImmediately, publishingDate, publishingTime, ...poiData} = poi
  return publishImmediately ?
    {publishingTimestamp: moment().unix(), ...poiData} :
    {publishingTimestamp: getTimestamp(publishingDate, publishingTime), ...poiData}
}

/**
 *
 *
 *
 */

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

  deletePOI = (key) => {
    return this.http.delete<{message: string}>(`${environment.backendUrl}poi/${key}`);
  }

  getContents = (key: string) => this.http.get<any>(`${environment.backendUrl}poi/content/${key}`);

  putContents = (contents, key) => this.http.put<any>(`${environment.backendUrl}poi/content/${key}`, contents);


  /**
   * Create form-data which is sent as enctype 'multipart/formdata'
   *
   */

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
