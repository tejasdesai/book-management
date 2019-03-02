import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAvailabilityComponent } from './manage-availability.component';

describe('ManageAvailabilityComponent', () => {
  let component: ManageAvailabilityComponent;
  let fixture: ComponentFixture<ManageAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
