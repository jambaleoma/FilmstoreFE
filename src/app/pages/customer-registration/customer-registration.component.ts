import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Customer } from 'src/app/core/_api/models';
import { CustomerService } from 'src/app/core/_api/services/customer.service';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.scss']
})
export class CustomerRegistrationComponent implements OnInit {

  customer: Customer = {
    value: null
  };

  registrationForm: FormGroup;

  repeatPassword: string;

  disableSave = true;

  submitted: boolean;

  calendar_it: any;

  dateToShow: Date;

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {

    this.renderer.addClass(document.body, 'backImage');

    this.registrationForm = this.formBuilder.group({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'dataDiNascita': new FormControl(Date, Validators.required),
      'sesso': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'repeatPassword': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    });
  }

  sessoCheck(s: string) {
    this.customer.sesso = s;
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  goToHelp() {
    
  }

  registerCustomer() {
    this.saveCustomer();
    this.submitted = true;
  }

  saveCustomer() {    
    this.dateToShow = this.registrationForm.get('dataDiNascita').value;
    
    if (this.registrationForm.get('password').value === this.registrationForm.get('repeatPassword').value) {
      this.confirmationService.confirm({
        message: 'Sicuro di voler registrare l\'utente ' + this.registrationForm.get('firstName').value + ' ' + this.registrationForm.get('lastName').value + ' ?',
        header: 'Registrazione Utente',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.customer = this.registrationForm.value;
          this.customer.label = this.customer.firstName;
          this.customer.value = this.customer.firstName;
          this.customerService.addCustomer(this.customer).subscribe(response => {
            if (response !== null) {
              this.messageService.add({
                key: 'customerRegistrationTost',
                severity: 'success',
                summary: 'Registrazione Completata',
                detail: 'Utente Registrato con Successo'
              });
              setTimeout(() => {
                this.router.navigate(['login']);
              }, 3000);
            }
          });
        },
        reject: () => {
        }
      });
    } else {
      this.messageService.add({
        key: 'customerRegistrationTost',
        severity: 'warn',
        summary: 'Errore Password',
        detail: 'Attenzione le Password non corrispondono'
      });
    }
  }

}
