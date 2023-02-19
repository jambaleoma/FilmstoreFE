import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { SelectItem, MessageService, ConfirmationService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table';
import { Richiesta, Customer } from 'src/app/core/_api/models';
import { CustomerService } from 'src/app/core/_api/services/customer.service';
import { RichiestaService } from 'src/app/core/_api/services/richiesta.service';

@Component({
  selector: 'app-richieste-list',
  templateUrl: './richieste-list.component.html',
  styleUrls: ['./richieste-list.component.scss']
})
export class RichiesteListComponent implements OnInit {

  listaRichiedenti: SelectItem[] = [];

  pipe: DatePipe = new DatePipe('it');

  richiestaSelezionata: Richiesta;

  richieste: Richiesta[];

  richiesta: Richiesta = { id: null };

  showRichieste = false;

  cols: any[];

  filters: any = {};

  formats: SelectItem[];

  statiRichiesta: SelectItem[];

  newRichiesta: boolean;

  displayDialog: boolean;

  customerOfRichiesta: Customer;

  loggedCustomer: Customer;

  percenutaleAvanzamento: number;

  @ViewChild('rt') rt: Table;

  constructor(
    private confirmationService: ConfirmationService,
    private richiestaService: RichiestaService,
    private customerService: CustomerService,
    private renderer: Renderer2,
    private messageService: MessageService
  ) {

    this.customerService.getCustomerByName(sessionStorage.getItem('customerfirstName')).subscribe(notification => {
      this.loggedCustomer = notification;
    });

    this.formats = [
      { label: '', value: '' },
      { label: '4K', value: '4K' },
      { label: 'FULL-HD', value: 'FULL-HD' },
      { label: 'HD', value: 'HD' },
      { label: 'DVD', value: 'DVD' }
    ];

    this.statiRichiesta = [
      { label: '', value: '' },
      { label: 'IN LAVORAZIONE', value: 'IN LAVORAZIONE' },
      { label: 'PRESA IN CARICO', value: 'PRESA IN CARICO' },
      { label: 'COMPLETATA', value: 'COMPLETATA' },
      { label: 'RIFIUTATA', value: 'RIFIUTATA' }
    ];
  }

  ngOnInit() {
    this.subsrcibeToListOfRichieste();
    this.subsrcibeToListOfCustomer();
    this.getCols();
  }

  getCols() {
    this.cols = [
      {
        field: 'nomeCliente',
        header: 'Richiedente',
      },
      {
        field: 'titoloFilmRichiesto',
        header: 'Titolo'
      },
      {
        field: 'formatoFilmRichiesto',
        header: 'Formato'
      },
      {
        field: 'dataInserimento',
        header: 'Data'
      },
      {
        field: 'stato',
        header: 'Stato Richiesta'
      }
    ];
  }

  subsrcibeToListOfCustomer() {
    this.customerService.getCustomers().subscribe(notification => {
      if (notification) {
        for (const richiedente of notification) {
          this.listaRichiedenti.push(richiedente);
        }
      }
    });
  }

  subsrcibeToListOfRichieste() {
    this.richiestaService.getRichieste().subscribe(notification => {
      this.richieste = notification;
      this.showRichieste = true;
    }, error => {
      this.showRichieste = true;
    }
    );
  }

  onRowSelect(event) {
    this.percenutaleAvanzamento = 0;
    this.newRichiesta = false;
    this.richiesta = this.cloneRichiesta(event.data);
    this.customerService.getCustomerByName(this.richiesta.nomeCliente).subscribe(response => {
      this.customerOfRichiesta = response;
    });
    this.displayDialog = true;
    setTimeout(() => {
      this.renderer.selectRootElement('#titolo').focus();
    }, 100);
    switch (this.richiesta.stato) {
      case 'IN LAVORAZIONE':
        this.richiesta.avanzamento = 33;
        break;
      case 'PRESA IN CARICO':
        this.richiesta.avanzamento = 66;
        break;
      case 'RIFIUTATA':
        this.richiesta.avanzamento = 100;
        break;
      case 'COMPLETATA':
        this.richiesta.avanzamento = 100;
        break;
    }
    const interval = setInterval(() => {
      this.percenutaleAvanzamento = this.percenutaleAvanzamento + Math.floor(Math.random() * 10) + 1;
      if (this.percenutaleAvanzamento >= this.richiesta.avanzamento) {
        this.percenutaleAvanzamento = this.richiesta.avanzamento;
        clearInterval(interval);
      }
    }, 1);
  }

  cloneRichiesta(r: Richiesta): Richiesta {
    const ric = { id: null };
    // tslint:disable-next-line:forin
    for (const prop in r) {
      ric[prop] = r[prop];
    }
    return ric;
  }

  showDialogToAdd() {
    this.percenutaleAvanzamento = 0;
    this.newRichiesta = true;
    this.richiesta = {
      id: null,
      dataInserimento: this.pipe.transform(new Date(), 'fullDate'),
      nomeCliente: this.loggedCustomer.firstName
    };
    this.customerService.getCustomerByName(sessionStorage.getItem('customerfirstName')).subscribe(response => {
      this.customerOfRichiesta = response;
    });
    this.displayDialog = true;
    setTimeout(() => {
      this.renderer.selectRootElement('#titolo').focus();
    }, 100);
  }

  save() {
    if (this.newRichiesta) {
      this.confirmationService.confirm({
        message: 'Sicuro di voler Inserire questa Richiesta?',
        header: 'Inserimento Richiesta',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.richiesta.nomeCliente = this.customerOfRichiesta.firstName;
          this.richiesta.stato = 'IN LAVORAZIONE';
          this.richiestaService.addRichiesta(this.richiesta).subscribe(response => {
            if (response !== null) {
              this.richieste = response as Richiesta[];
              this.richiesta = null;
              this.displayDialog = false;
              this.customerOfRichiesta.numeroRichieste++;
              this.customerService.updateCustomer(this.customerOfRichiesta).subscribe();
              this.messageService.add({
                key: 'richiesteListTost',
                severity: 'success', summary: 'Inserimento Completato', detail: 'Richiesta Inserita'
              });
            }
          });
        },
        reject: () => { }
      });
    } else {
      this.confirmationService.confirm({
        message: 'Sicuro di voler Aggiornare questa Richiesta?',
        header: 'Aggiornamento Richiesta',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (this.customerOfRichiesta.firstName !== this.richiesta.nomeCliente) {
            this.customerOfRichiesta.numeroRichieste--;
            this.customerService.updateCustomer(this.customerOfRichiesta).subscribe();
            this.customerService.getCustomerByName(this.richiesta.nomeCliente).subscribe(notification => {
              const customerToRemoveRequest = notification;
              customerToRemoveRequest.numeroRichieste++;
              this.customerService.updateCustomer(customerToRemoveRequest).subscribe();
            });
          }
          this.richiestaService.updateRichiesta(this.richiesta).subscribe(response => {
            if (response !== null) {
              this.richieste = response as Richiesta[];
              this.richiesta = null;
              this.displayDialog = false;
              this.messageService.add({
                key: 'richiesteListTost',
                severity: 'success', summary: 'Aggiornamento Completato', detail: 'Richiesta Aggiornata'
              });
            }
          });
        },
        reject: () => { }
      });
    }
  }

  delete() {
    this.confirmationService.confirm({
      message: 'Sicuro di voler Eliminare questa Richiesta?',
      header: 'Eliminazione Richiesta',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.richiestaService.deleteRichiesta(this.richiestaSelezionata.id).subscribe(response => {
          if (response !== null) {
            const index = this.richieste.indexOf(this.richiestaSelezionata);
            this.richieste = this.richieste.filter((val, i) => i !== index);
            this.richiesta = null;
            this.displayDialog = false;
            this.customerOfRichiesta.numeroRichieste--;
            this.customerService.updateCustomer(this.customerOfRichiesta).subscribe();
            this.messageService.add({
              key: 'richiesteListTost',
              severity: 'success', summary: 'Eliminazione Completata', detail: 'Richiesta Eliminata'
            });
          }
        });
      }, reject: () => { }
    });
  }

  close() {
    this.displayDialog = false;
  }

  //  *** Reset Valori selzionati nei Filtri ***
  reset(stvt: Table) {
    stvt.reset();
    this.filters = {};
  }

  gestisciRichiesta(richiesta: Richiesta, value: string) {
    switch (value) {
      case 'Presa_In_Carico':
        richiesta.stato = 'PRESA IN CARICO';
        break;
      case 'Rifiuta':
        richiesta.stato = 'RIFIUTATA';
        break;
      case 'Completa':
        richiesta.stato = 'COMPLETATA';
        break;
    }
    this.richiestaService.updateRichiesta(richiesta).subscribe(response => {
      if (response !== null) {
        this.richieste = response as Richiesta[];
        this.messageService.add({
          key: 'richiesteListTost',
          severity: 'success', summary: 'Gestione Completata', detail: 'Stato Richiesta: ' + richiesta.stato
        });
      }
    });
  }
}
