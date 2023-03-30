import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { ApiConfiguration } from 'src/app/core/_api/api-configuration';
import { FilmService } from 'src/app/core/_api/services/film.service';
import { ApplicationService } from 'src/app/core/_service/application.service';

import { RicercaFilmComponent } from './ricerca-film.component';

describe('RicercaFilmComponent', () => {
  let component: RicercaFilmComponent;
  let fixture: ComponentFixture<RicercaFilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RicercaFilmComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [ FilmService, ApiConfiguration, HttpClient, HttpHandler, ApplicationService, MessageService ] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RicercaFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
