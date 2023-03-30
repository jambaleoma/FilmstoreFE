import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiConfiguration } from 'src/app/core/_api/api-configuration';
import { FilmService } from 'src/app/core/_api/services/film.service';
import { ApplicationService } from 'src/app/core/_service/application.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GestioneFilmComponent } from './gestione-film.component';

describe('GestioneFilmComponent', () => {
  let component: GestioneFilmComponent;
  let fixture: ComponentFixture<GestioneFilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestioneFilmComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [ ApplicationService, ConfirmationService, FilmService, ApiConfiguration, HttpClient, HttpHandler, MessageService ],
      imports: [ FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioneFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
