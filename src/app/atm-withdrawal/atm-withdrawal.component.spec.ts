import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmWithdrawalComponent } from './atm-withdrawal.component';

describe('AtmWithdrawalComponent', () => {
  let component: AtmWithdrawalComponent;
  let fixture: ComponentFixture<AtmWithdrawalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtmWithdrawalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
