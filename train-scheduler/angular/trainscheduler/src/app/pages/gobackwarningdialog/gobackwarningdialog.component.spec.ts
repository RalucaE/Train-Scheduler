import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GobackwarningdialogComponent } from './gobackwarningdialog.component';

describe('GobackwarningdialogComponent', () => {
  let component: GobackwarningdialogComponent;
  let fixture: ComponentFixture<GobackwarningdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GobackwarningdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GobackwarningdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
