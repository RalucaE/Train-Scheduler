import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnRoutesDialogComponent } from './return-routes-dialog.component';

describe('ReturnRoutesDialogComponent', () => {
  let component: ReturnRoutesDialogComponent;
  let fixture: ComponentFixture<ReturnRoutesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnRoutesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnRoutesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
