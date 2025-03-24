import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberSpace',
})
export class NumberSpacePipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}
