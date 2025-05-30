import { Pipe, PipeTransform } from '@angular/core';

//Transforms numeric input into a string where a space is inserted after each 3 non-decimal digits for numbers with more than 4 non decimal digits:
// 1.23 -> 1.23
// 1234.56 -> 1234.56
// 12345.67 -> 12 345.67
@Pipe({
  name: 'numberSpace',
})
export class NumberSpacePipe implements PipeTransform {
  transform(value: number, threshold?: number): string | null {
    if (value == null) {
      return null;
    }

    if (threshold && value < threshold) {
      return value.toString();
    }

    value = Math.round(value);
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

    result = result.trim();

    return result;
  }
}
