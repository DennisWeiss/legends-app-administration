import { Pipe, PipeTransform } from '@angular/core';
import translate from '../../translations/translate';
import { LocaleService } from '../services/locale.service';
import {updateLocale} from "moment";


/**
 * Is used to translate text in templates.
 * Implemented as an impure pipe: Holds current state of selected language.
 * If language is changed, pipe is updated as well and updates text in templates.
 */

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
