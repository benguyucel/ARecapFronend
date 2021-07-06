import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'colorPipe',
})
export class ColorPipePipe implements PipeTransform {
  transform(value: Color[], filterText: string): Color[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : filterText;
    return filterText
      ? value.filter((c: Color) => c.name.toLowerCase().indexOf(filterText)!==-1)
      : value;
  }
}
