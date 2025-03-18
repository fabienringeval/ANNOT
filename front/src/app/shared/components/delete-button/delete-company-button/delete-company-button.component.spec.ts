import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCompanyButtonComponent } from './delete-company-button.component';

describe('DeleteCompanyButtonComponent', () => {
  let component: DeleteCompanyButtonComponent;
  let fixture: ComponentFixture<DeleteCompanyButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCompanyButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCompanyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
