import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiConfiguration } from 'src/app/core/_api/api-configuration';
import { CustomerService } from 'src/app/core/_api/services/customer.service';
import { ApplicationService } from 'src/app/core/_service/application.service';

import { CustomersListaComponent } from './customers-lista.component';

describe('CustomersListaComponent', () => {
  let component: CustomersListaComponent;
  let fixture: ComponentFixture<CustomersListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersListaComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ ConfirmationService, CustomerService, ApiConfiguration, HttpClient, HttpHandler, ApplicationService, MessageService ],
      imports: [ FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
