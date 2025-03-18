import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyButtonComponent } from './create-company-button.component';

describe('CreateCompanyButtonComponent', () => {
  let component: CreateCompanyButtonComponent;
  let fixture: ComponentFixture<CreateCompanyButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCompanyButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompanyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
