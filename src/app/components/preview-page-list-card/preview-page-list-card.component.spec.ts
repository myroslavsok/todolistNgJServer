import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPageListCardComponent } from './preview-page-list-card.component';

describe('PreviewPageListCardComponent', () => {
  let component: PreviewPageListCardComponent;
  let fixture: ComponentFixture<PreviewPageListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewPageListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewPageListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
