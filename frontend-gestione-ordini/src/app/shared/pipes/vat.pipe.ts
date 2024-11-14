import { Pipe, PipeTransform } from '@angular/core';

// pipe custom per il calcolo del prezzo dell'iva
// accetta un array di price + vat

@Pipe({
  name: 'vat',
  standalone: true,
})
export class VatPipe implements PipeTransform {
  transform(value: number[]): number {
    const [price, vat] = value;
    const percentageVat = vat / 100;
    return price + price * percentageVat;
  }
}
