import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayComponentComponent } from './pay-component.component';

describe('PayComponentComponent', () => {
  let component: PayComponentComponent;
  let fixture: ComponentFixture<PayComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
