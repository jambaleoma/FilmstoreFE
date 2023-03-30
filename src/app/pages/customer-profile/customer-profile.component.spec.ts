import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiConfiguration } from 'src/app/core/_api/api-configuration';
import { CustomerService } from 'src/app/core/_api/services/customer.service';
import { ApplicationService } from 'src/app/core/_service/application.service';

import { CustomerProfileComponent } from './customer-profile.component';

describe('CustomerProfileComponent', () => {
  let component: CustomerProfileComponent;
  let fixture: ComponentFixture<CustomerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerProfileComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ CustomerService, ApiConfiguration, HttpClient, HttpHandler, ApplicationService, ConfirmationService, MessageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
