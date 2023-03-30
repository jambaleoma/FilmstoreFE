import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiConfiguration } from 'src/app/core/_api/api-configuration';
import { SerieService } from 'src/app/core/_api/services/serie.service';
import { StagioneService } from 'src/app/core/_api/services/stagione.service';
import { ApplicationService } from 'src/app/core/_service/application.service';

import { GestioneSerieTvComponent } from './gestione-serie-tv.component';

describe('GestioneSerieTvComponent', () => {
  let component: GestioneSerieTvComponent;
  let fixture: ComponentFixture<GestioneSerieTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestioneSerieTvComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [ ApplicationService, ConfirmationService, SerieService, ApiConfiguration, HttpClient, HttpHandler, StagioneService, MessageService ],
      imports: [ FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioneSerieTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
