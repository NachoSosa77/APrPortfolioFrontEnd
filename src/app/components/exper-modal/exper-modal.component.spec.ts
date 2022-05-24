import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperModalComponent } from './exper-modal.component';

describe('ExperModalComponent', () => {
  let component: ExperModalComponent;
  let fixture: ComponentFixture<ExperModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
