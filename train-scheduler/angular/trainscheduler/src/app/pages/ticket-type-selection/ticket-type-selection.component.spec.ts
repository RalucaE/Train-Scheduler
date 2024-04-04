import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTypeSelectionComponent } from './ticket-type-selection.component';

describe('TicketTypeSelectionComponent', () => {
  let component: TicketTypeSelectionComponent;
  let fixture: ComponentFixture<TicketTypeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketTypeSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
