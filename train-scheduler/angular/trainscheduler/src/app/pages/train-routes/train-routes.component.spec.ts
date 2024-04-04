import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainRoutesComponent } from './train-routes.component';

describe('TrainRoutesComponent', () => {
  let component: TrainRoutesComponent;
  let fixture: ComponentFixture<TrainRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainRoutesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
