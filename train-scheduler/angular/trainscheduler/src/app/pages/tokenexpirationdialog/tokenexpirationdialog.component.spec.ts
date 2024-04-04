import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenexpirationdialogComponent } from './tokenexpirationdialog.component';

describe('TokenexpirationdialogComponent', () => {
  let component: TokenexpirationdialogComponent;
  let fixture: ComponentFixture<TokenexpirationdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenexpirationdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenexpirationdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
