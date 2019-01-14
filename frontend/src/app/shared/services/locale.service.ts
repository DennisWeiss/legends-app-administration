import {EventEmitter, Injectable} from '@angular/core'


/**
 * Holds currently selected language
 * Informs other components about languarge-update
 * Saves current language in localStorage, which is restored later after reopening browser
 */

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  private locale = 'de'

  localeUpdated = new EventEmitter()

  constructor() {
    const localeFromLocalStorage = localStorage.getItem('locale')
    if (localeFromLocalStorage) {
      this.locale = localeFromLocalStorage
    }
  }

  setLocale = (locale: string) => {
    this.locale = locale
    localStorage.setItem('locale', this.locale)
    this.localeUpdated.emit(this.locale)
  }

  getLocale = () => this.locale
}
