import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarreVerticaleComponent } from './barre-verticale.component';

describe('BarreVerticaleComponent', () => {
  let component: BarreVerticaleComponent;
  let fixture: ComponentFixture<BarreVerticaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarreVerticaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarreVerticaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
