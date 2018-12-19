import { Pipe, PipeTransform } from '@angular/core';
import translate from './translations/translate';
import { LocaleService } from './locale.service';
import {updateLocale} from "moment";

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {

  locale: string;
  lastName: string;
  t;

  constructor(private localeService: LocaleService) {
    this.locale = this.localeService.getLocale();
    this.localeService.localeUpdated.subscribe(locale => {
      this.locale = locale;
      this.t = translate(this.lastName, this.locale);
    })
  }

  transform(value: string, name: any): string {
    if (this.lastName !== name) {
      this.t = translate(name, this.locale);
      this.lastName = name;
    }
    return this.t(value);
  }
}
