import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFilmCardComponent } from './home-film-card.component';

describe('HomeFilmCardComponent', () => {
  let component: HomeFilmCardComponent;
  let fixture: ComponentFixture<HomeFilmCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeFilmCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFilmCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
