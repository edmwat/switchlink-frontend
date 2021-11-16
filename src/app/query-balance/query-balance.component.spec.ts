import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryBalanceComponent } from './query-balance.component';

describe('QueryBalanceComponent', () => {
  let component: QueryBalanceComponent;
  let fixture: ComponentFixture<QueryBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
