import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  private locale = 'de'

  constructor() { }

  setLocale = (locale: string) => this.locale = locale

  getLocale = () => this.locale
}
