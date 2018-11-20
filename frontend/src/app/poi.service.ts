import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from '../environments/environment';
import { Sight, Legend, Restaurant } from './poi-edit/poi.model';
import { Subject } from 'rxjs';



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

  getPOI = (key: string) => this.http.get<Sight | Legend | Restaurant>(`${environment.backendUrl}poi/key/${key}`)

  postPOI = (poi: Restaurant | Legend | Sight) => {
    return this.http.post(`${environment.backendUrl}poi`, this.createFormData(poi));
  };

  putPOI = (poi: Restaurant | Legend | Sight) => {
    return this.http.put(`${environment.backendUrl}poi`, this.createFormData(poi));
  }

  getContents = (key: string) => this.http.get<any>(`${environment.backendUrl}poi/content/${key}`);

  putContents = (contents, key) => this.http.put<any>(`${environment.backendUrl}poi/content/${key}`, contents);

  private createFormData = (poi) => {
    const postData = new FormData();
    postData.append('poi', JSON.stringify(poi));
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
