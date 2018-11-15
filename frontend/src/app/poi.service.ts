import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import appConf from '../../app-conf'
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {getPreviousOrParentTNode} from '@angular/core/src/render3/instructions';



@Injectable({
  providedIn: 'root'
})
export class PoiService {

  constructor(private http: HttpClient) {
  }

  retrievePOIs = (type?: String) => this.http.get(`${appConf.backendUrl}poi/${type ? `${type}/` : ''}`)


  /**
   * TODO: Create model for POI
   */

  getPOI = (key: string) => this.http.get<any>(`${appConf.backendUrl}poi/key/${key}`)


  postFile = (fileToUpload: File) => {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post<any>(appConf.backendUrl, formData);
  }

}
