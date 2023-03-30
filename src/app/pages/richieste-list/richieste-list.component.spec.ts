import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiConfiguration } from 'src/app/core/_api/api-configuration';
import { CustomerService } from 'src/app/core/_api/services/customer.service';
import { RichiestaService } from 'src/app/core/_api/services/richiesta.service';

import { RichiesteListComponent } from './richieste-list.component';

describe('RichiesteListComponent', () => {
  let component: RichiesteListComponent;
  let fixture: ComponentFixture<RichiesteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichiesteListComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        ConfirmationService, RichiestaService, ApiConfiguration, HttpClient,
        HttpHandler, CustomerService, MessageService ],
      imports: [ FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichiesteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
