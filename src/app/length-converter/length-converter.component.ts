import { Component } from '@angular/core';

@Component({
  selector: 'app-length-converter',
  templateUrl: './length-converter.component.html',
  styleUrls: ['./length-converter.component.css']
})
export class LengthConverterComponent {
  fromUnit: 'm' | 'yd' | 'in' = 'm';
  toUnit: 'm' | 'yd' | 'in' = 'yd';
  amount: number = 1;
  result: number = 0;

  units: { [key in 'm' | 'yd' | 'in']: number } = {
    'm': 1,
    'yd': 1.09361,
    'in': 39.3701
  };

  convert(): void {
    const fromRate = this.units[this.fromUnit];
    const toRate = this.units[this.toUnit];
    this.result = (this.amount * toRate) / fromRate;
  }
}
