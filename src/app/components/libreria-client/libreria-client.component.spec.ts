import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibreriaClientComponent } from './libreria-client.component';

describe('LibreriaClientComponent', () => {
  let component: LibreriaClientComponent;
  let fixture: ComponentFixture<LibreriaClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibreriaClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibreriaClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
