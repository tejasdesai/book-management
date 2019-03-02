import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateBookComponent } from './donate-book.component';

describe('DonateBookComponent', () => {
  let component: DonateBookComponent;
  let fixture: ComponentFixture<DonateBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
