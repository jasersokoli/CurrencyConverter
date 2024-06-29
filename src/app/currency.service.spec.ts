import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyService]
    });
    service = TestBed.inject(CurrencyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch exchange rates', () => {
    const dummyRates = {
      rates: {
        USD: 1,
        EUR: 0.85
      }
    };

    service.getExchangeRates().subscribe(rates => {
      expect(rates.rates.USD).toBe(1);
      expect(rates.rates.EUR).toBe(0.85);
    });

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRates);
  });

  it('should fetch historical rates', () => {
    const dummyRates = {
      rates: {
        USD: 1,
        EUR: 0.85
      }
    };
    const date = '2024-06-28';

    service.getHistoricalRates(date).subscribe(rates => {
      expect(rates.rates.USD).toBe(1);
      expect(rates.rates.EUR).toBe(0.85);
    });

    const req = httpMock.expectOne(`${service.historicalApiUrl}&date=${date}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRates);
  });
});
