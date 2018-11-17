import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { environment } from '../environments/environment';
import { Sight, Legend, Restaurant } from './poi-edit/poi.model';



@Injectable({
  providedIn: 'root'
})
export class PoiService {

  constructor(private http: HttpClient) {
  }

  retrievePOIs = (type?: String) => this.http.get(`${environment.backendUrl}poi/${type ? `${type}/` : ''}`)


  /**
   * TODO: Create model for POI
   */

  getPOI = (key: string) => this.http.get<Sight | Legend | Restaurant>(`${environment.backendUrl}poi/key/${key}`)

  postPOI = (poi: Restaurant | Legend | Sight) => this.http.post(`${environment.backendUrl}poi`, poi);


  postFile = (fileToUpload: File) => {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post<any>(environment.backendUrl, formData);
  }

}
