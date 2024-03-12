import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarreVertComponent } from './barre-vert.component';

describe('BarreVertComponent', () => {
  let component: BarreVertComponent;
  let fixture: ComponentFixture<BarreVertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarreVertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarreVertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
