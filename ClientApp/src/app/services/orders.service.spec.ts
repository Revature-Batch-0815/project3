import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(OrdersService);

  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
