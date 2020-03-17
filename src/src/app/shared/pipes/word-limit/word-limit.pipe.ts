import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordLimit'
})
export class WordLimitPipe implements PipeTransform {

  transform(value: string, limit: number = 3): string {
    let splitValue = value.split(" ");

    if(splitValue.length > 0){      
      let endString = splitValue.length > limit ? "...": "";

      return splitValue.splice(0,limit).join(" ") + endString;
    }else {
      return value;
    }
  }

}
