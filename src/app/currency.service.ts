import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  public apiUrl = 'https://api.currencyfreaks.com/latest?apikey=82f90c26aee843d0ae629a05e18ddba2';
  public historicalApiUrl = 'https://api.currencyfreaks.com/v2.0/rates/historical?apikey=82f90c26aee843d0ae629a05e18ddba2';

  constructor(private http: HttpClient) { }

  getExchangeRates(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getHistoricalRates(date: string): Observable<any> {
    return this.http.get<any>(`${this.historicalApiUrl}&date=${date}`).pipe(
      catchError(() => of(null)) // Return null if there is an error
    );
  }
}
