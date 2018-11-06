import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'


const backendUrl = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})
export class PoiService {

  constructor(private http: HttpClient) {
  }

  retrievePOIs = (type?: String) => this.http.get(`${backendUrl}poi/${type ? `${type}/` : ''}`)


}
