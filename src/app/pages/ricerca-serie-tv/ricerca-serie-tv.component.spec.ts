import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiConfiguration } from 'src/app/core/_api/api-configuration';
import { SerieService } from 'src/app/core/_api/services/serie.service';

import { RicercaSerieTvComponent } from './ricerca-serie-tv.component';

describe('RicercaSerieTvComponent', () => {
  let component: RicercaSerieTvComponent;
  let fixture: ComponentFixture<RicercaSerieTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RicercaSerieTvComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [ SerieService, ApiConfiguration, HttpClient, HttpHandler ] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RicercaSerieTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
