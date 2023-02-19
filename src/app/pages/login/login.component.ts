import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Customer } from 'src/app/core/_api/models';
import { CustomerService } from 'src/app/core/_api/services/customer.service';
import { ApplicationService } from 'src/app/core/_service/application.service';
import { AuthService } from 'src/app/core/_service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  customersItems: Customer[];

  psw: string;

  showDialog = false;

  loginForm: FormGroup;

  minLengthPass: number = 3;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private renderer: Renderer2,
    private messageService: MessageService,
    private applicationService: ApplicationService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.renderer.addClass(document.body, 'backImage');
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(this.minLengthPass)])),
    });
  }

  loginCustomer(form: FormGroup) {
    if (form.value.password) {
      const loginParams = {
        username: form.value.username,
        password: form.value.password
      }
      this.customerService.logingCustomer(loginParams).subscribe(loginCustomer => {
        if (loginCustomer) {
          this.applicationService.firstLogin();
          sessionStorage.setItem('customerfirstName', loginCustomer.firstName);
          sessionStorage.setItem('customer', JSON.stringify(loginCustomer));
          if (loginCustomer.admin) {
            this.authService.loginAdmin();
          } else {
            this.authService.login();
          }
        } else {
          this.messageService.add({ key: 'KO', severity: 'error', summary: 'Accesso Negato', detail: 'Password non Corretta' });
        }
      });
    }
  }

  goToRegistration() {
    this.router.navigate(['registration']);
  }

  goToHelp() {
    this.router.navigateByUrl('/myInterviewApp/help');
  }

}
