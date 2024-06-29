import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  rates: any;
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  amount: number = 1;
  result: number = 0;
  historicalData: any[] = [];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.currencyService.getExchangeRates().subscribe(data => {
      this.rates = data.rates;
    });
  }

  convert(): void {
    if (this.rates) {
      const fromRate = this.rates[this.fromCurrency];
      const toRate = this.rates[this.toCurrency];
      this.result = (this.amount / fromRate) * toRate;
      this.fetchHistoricalData();
    }
  }

  fetchHistoricalData(): void {
    const dates = this.getLast7Days();
    this.historicalData = [];

    let seriesData = [];

    dates.forEach(date => {
      this.currencyService.getHistoricalRates(date).subscribe(data => {
        if (data && data.rates) {
          const fromRate = data.rates[this.fromCurrency];
          const toRate = data.rates[this.toCurrency];
          const rate = (1 / fromRate) * toRate;
          seriesData.push({ name: date, value: rate });
          // Ensure change detection
          this.historicalData = [
            {
              name: `${this.fromCurrency} to ${this.toCurrency}`,
              series: seriesData
            }
          ];
        }
      });
    });
  }

  getLast7Days(): string[] {
    const dates = [];
    for (let i = 1; i < 8; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  }

  formatYAxisTicks(value: any): string {
    return value.toFixed(4);  // Format y-axis ticks to 2 decimal places
  }
}
