import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getPreviousOrParentTNode } from '@angular/core/src/render3/instructions';


const backendUrl = 'http://localhost:3000/'



@Injectable({
  providedIn: 'root'
})
export class PoiService {

  constructor(private http: HttpClient) {
  }

  retrievePOIs = (type?: String) => this.http.get(`${backendUrl}poi/${type ? `${type}/` : ''}`)


  /**
   * TODO: Create model for POI
   */

  getPOI (key): Observable<any> {
    return this.http.get<any>(`${backendUrl}poi/key/${key}`);
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = backendUrl;
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post<any>(endpoint, formData);
}

}
