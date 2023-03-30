import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiConfiguration } from 'src/app/core/_api/api-configuration';
import { CustomerService } from 'src/app/core/_api/services/customer.service';
import { FilmService } from 'src/app/core/_api/services/film.service';
import { RichiestaService } from 'src/app/core/_api/services/richiesta.service';
import { StagioneService } from 'src/app/core/_api/services/stagione.service';
import { VotoService } from 'src/app/core/_api/services/voto.service';

import { StatisticheComponent } from './statistiche.component';

describe('StatisticheComponent', () => {
  let component: StatisticheComponent;
  let fixture: ComponentFixture<StatisticheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticheComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        CustomerService, ApiConfiguration, HttpClient, HttpHandler,
        RichiestaService, FilmService, StagioneService, VotoService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
