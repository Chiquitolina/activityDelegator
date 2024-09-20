import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManualDataComponent } from './add-manual-data.component';

describe('AddManualDataComponent', () => {
  let component: AddManualDataComponent;
  let fixture: ComponentFixture<AddManualDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddManualDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddManualDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
