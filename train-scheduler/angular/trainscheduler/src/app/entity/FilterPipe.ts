import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], term: string): any[] {
    if (!value || !term) {
      return value;
    }
    return value.filter(item => {
      return Object.values(item).some(val => {
        if (val && typeof val === "string") {
          return val.toLowerCase().includes(term.toLowerCase());
        }
        return false;
      });
    });
  }

}
