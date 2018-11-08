import {EventEmitter, Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  private locale = 'de'

  localeUpdated = new EventEmitter()

  constructor() { }

  setLocale = (locale: string) => {
    this.locale = locale
    this.localeUpdated.emit(this.locale)
  }

  getLocale = () => this.locale
}
