import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LengthConverterComponent } from './length-converter.component';

describe('LengthConverterComponent', () => {
  let component: LengthConverterComponent;
  let fixture: ComponentFixture<LengthConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
        BrowserAnimationsModule
      ],
      declarations: [LengthConverterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LengthConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert length units correctly', () => {
    component.amount = 9;
    component.fromUnit = 'yd';
    component.toUnit = 'in';
    component.convert();
    expect(component.result).toBeCloseTo(324, 2);

    component.amount = 500;
    component.fromUnit = 'in';
    component.toUnit = 'm';
    component.convert();
    expect(component.result).toBeCloseTo(12.7, 1);
  });
});
