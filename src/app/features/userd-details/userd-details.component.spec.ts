import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdDetailsComponent } from './userd-details.component';

describe('UserdDetailsComponent', () => {
  let component: UserdDetailsComponent;
  let fixture: ComponentFixture<UserdDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserdDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserdDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
