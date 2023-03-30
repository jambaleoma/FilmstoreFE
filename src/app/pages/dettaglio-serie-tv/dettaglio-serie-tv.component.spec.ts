import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiConfiguration } from 'src/app/core/_api/api-configuration';
import { SerieService } from 'src/app/core/_api/services/serie.service';
import { StagioneService } from 'src/app/core/_api/services/stagione.service';

import { DettaglioSerieTvComponent } from './dettaglio-serie-tv.component';

describe('DettaglioSerieTvComponent', () => {
  let component: DettaglioSerieTvComponent;
  let fixture: ComponentFixture<DettaglioSerieTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DettaglioSerieTvComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ RouterTestingModule ],
      providers: [ SerieService, ApiConfiguration, HttpClient, HttpHandler, ApiConfiguration, StagioneService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DettaglioSerieTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
