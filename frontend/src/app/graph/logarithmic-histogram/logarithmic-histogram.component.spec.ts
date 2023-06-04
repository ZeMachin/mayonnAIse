import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogarithmicHistogramComponent } from './logarithmic-histogram.component';

describe('LogarithmicHistogramComponent', () => {
  let component: LogarithmicHistogramComponent;
  let fixture: ComponentFixture<LogarithmicHistogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogarithmicHistogramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogarithmicHistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
