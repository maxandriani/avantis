import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorParserService {

  constructor() { }

  parse(control: AbstractControl) {
    let s = '';
    if (control.invalid) {
      for (const [key, value] of Object.entries(control.errors)) {
        if (value && value['error']) {
          s += value['error']['message'] + '. ';
        } else {
          console.log(key);
          switch (key) {
            case 'required':
              s += 'Campo requerido! ';
              break;
          }
        }
      }
    }
    return s;
  }
}
