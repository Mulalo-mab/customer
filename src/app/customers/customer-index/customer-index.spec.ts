import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerIndex } from './customer-index';

describe('CustomerIndex', () => {
  let component: CustomerIndex;
  let fixture: ComponentFixture<CustomerIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerIndex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerIndex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
