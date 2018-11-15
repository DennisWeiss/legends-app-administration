import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { environment } from '../environments/environment';



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

  getPOI = (key: string) => this.http.get<any>(`${environment.backendUrl}poi/key/${key}`)


  postFile = (fileToUpload: File) => {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post<any>(environment.backendUrl, formData);
  }

}
