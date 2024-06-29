import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { By } from '@angular/platform-browser';
import { CurrencyConverterComponent } from './currency-converter.component';
import { CurrencyService } from '../currency.service';
import { of } from 'rxjs';

describe('CurrencyConverterComponent', () => {
  let component: CurrencyConverterComponent;
  let fixture: ComponentFixture<CurrencyConverterComponent>;
  let currencyService: CurrencyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
        BrowserAnimationsModule,
        NgxChartsModule
      ],
      declarations: [CurrencyConverterComponent],
      providers: [CurrencyService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConverterComponent);
    component = fixture.componentInstance;
    currencyService = TestBed.inject(CurrencyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with exchange rates', () => {
    const dummyRates = {
      rates: {
        USD: 1,
        EUR: 0.85
      }
    };
    spyOn(currencyService, 'getExchangeRates').and.returnValue(of(dummyRates));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.rates).toEqual(dummyRates.rates);
  });

  it('should convert currency', () => {
    component.rates = {
      USD: 1,
      EUR: 0.85
    };
    component.amount = 100;
    component.fromCurrency = 'USD';
    component.toCurrency = 'EUR';

    component.convert();

    expect(component.result).toBe(85);
  });

  it('should fetch historical data', () => {
    const dummyHistoricalRates = {
      rates: {
        USD: 1,
        EUR: 0.85
      }
    };
    spyOn(currencyService, 'getHistoricalRates').and.returnValue(of(dummyHistoricalRates));

    component.rates = {
      USD: 1,
      EUR: 0.85
    };
    component.fromCurrency = 'USD';
    component.toCurrency = 'EUR';
    component.convert();
    component.fetchHistoricalData();
    fixture.detectChanges();

    expect(component.historicalData.length).toBeGreaterThan(0);
  });

  it('should render conversion result', () => {
    component.result = 85;
    fixture.detectChanges();

    const resultElement = fixture.debugElement.query(By.css('div p')).nativeElement;
    expect(resultElement.textContent).toContain('85');
  });
});
