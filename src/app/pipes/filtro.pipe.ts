import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(data: any[], text: string = ''): any[] {
    if(text === ''){
      return data;
    }
    if(!data){
      return data;
    }
    text = text.toLocaleLowerCase();

    return data.filter(
      item => item.customer.name.toLocaleLowerCase().includes( text )
    );
  }

}
