import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPropertyComponent } from './products-property.component';

describe('ProductsPropertyComponent', () => {
  let component: ProductsPropertyComponent;
  let fixture: ComponentFixture<ProductsPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
