import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibreriasPropertyComponent } from './librerias-property.component';

describe('LibreriasPropertyComponent', () => {
  let component: LibreriasPropertyComponent;
  let fixture: ComponentFixture<LibreriasPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibreriasPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibreriasPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
