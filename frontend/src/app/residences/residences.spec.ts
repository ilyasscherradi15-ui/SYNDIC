import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Residences } from './residences';

describe('Residences', () => {
  let component: Residences;
  let fixture: ComponentFixture<Residences>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Residences],
    }).compileComponents();

    fixture = TestBed.createComponent(Residences);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
