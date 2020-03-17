import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateMask'
})
export class DateMaskPipe implements PipeTransform {

  transform(value: string, item: any): string {
    if (item !== undefined && item.columnType === 'date') {
      const date = new Date (value);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return (day < 10 ? '0' + day : day) + ' - ' +  date.toLocaleString('es', { month: 'long' }) + ' - ' + year;
    }
    return value;
  }

}
