import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilHomepageComponent } from './profil-homepage.component';

describe('ProfilHomepageComponent', () => {
  let component: ProfilHomepageComponent;
  let fixture: ComponentFixture<ProfilHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
