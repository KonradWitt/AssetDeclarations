import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberSpace',
})
export class NumberSpacePipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (!value) return '';

    var result: string = '';

    const strVal = value.toString();
    const split = strVal.split('.');

    if (split[0].length <= 4) return strVal;

    let processedDigits: number = 0;
    while (processedDigits < split[0].length) {
      result = split[0][split[0].length - processedDigits - 1] + result;
      processedDigits++;
      if (processedDigits % 3 == 0) result = ' ' + result;
    }

    if (split.length > 1) {
      result = result + '.' + split[1];
    }

    return result;
  }
}
