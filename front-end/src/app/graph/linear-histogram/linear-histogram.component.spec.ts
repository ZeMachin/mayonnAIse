import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearHistogramComponent } from './linear-histogram.component';

describe('LinearHistogramComponent', () => {
  let component: LinearHistogramComponent;
  let fixture: ComponentFixture<LinearHistogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinearHistogramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinearHistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
