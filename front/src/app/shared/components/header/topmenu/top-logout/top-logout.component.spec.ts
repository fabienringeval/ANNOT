import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLogoutComponent } from './top-logout.component';

describe('TopLogoutComponent', () => {
  let component: TopLogoutComponent;
  let fixture: ComponentFixture<TopLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
