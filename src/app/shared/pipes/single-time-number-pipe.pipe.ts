import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'singleTimeNumberPipe'
})
export class SingleTimeNumberPipePipe implements PipeTransform {

  // If the number is below 10, add a 0 before
  transform(value: any, ...args: any[]): any {

    return (parseInt(value, 10) < 10) ? '0' + value : value;
  }
}
