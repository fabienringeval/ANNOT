import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCampaignButtonComponent } from './delete-campaign-button.component';

describe('DeleteCampaignButtonComponent', () => {
  let component: DeleteCampaignButtonComponent;
  let fixture: ComponentFixture<DeleteCampaignButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCampaignButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCampaignButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
