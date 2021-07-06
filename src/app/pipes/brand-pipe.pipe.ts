import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'brandPipe'
})
export class BrandPipePipe implements PipeTransform {

  transform(value: Brand[],filterText:string):Brand[] {
    filterText=filterText?filterText.toLocaleLowerCase():filterText;
    
    return filterText?value.filter((c:Brand)=>c.name.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
