import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotLoggedInModalComponent } from './not-logged-in-modal.component';

describe('NotLoggedInModalComponent', () => {
  let component: NotLoggedInModalComponent;
  let fixture: ComponentFixture<NotLoggedInModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotLoggedInModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotLoggedInModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
