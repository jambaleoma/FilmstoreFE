import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { faPlus, faTrash, faCheck, faUpload } from '@fortawesome/free-solid-svg-icons';
import { SelectItem, ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable, debounceTime, distinctUntilChanged, tap, switchMap, catchError, of } from 'rxjs';
import { Film, ListItem } from 'src/app/core/_api/models';
import { FilmService } from 'src/app/core/_api/services/film.service';
import { ApplicationService } from 'src/app/core/_service/application.service';

@Component({
  selector: 'app-gestione-film',
  templateUrl: './gestione-film.component.html',
  styleUrls: ['./gestione-film.component.scss']
})
export class GestioneFilmComponent implements OnInit {

  public filmSearchFilterForm = this.fb.nonNullable.group({
    name: [''],
    format: ['']
  });

  public filmNameAsyncInput = new FormControl('');

  public filmFormatAsyncInput = new FormControl();

  filmSelezionato: Film;

  films: Film[];

  film: Film = { _id: null };

  filmsByFilter: Film[];

  totalRecordsByFilter = 0;

  showFilm = false;

  filters: any = {};

  yearTimeout: any;

  yearFilter: number;

  cols: any[];

  formats: SelectItem[];

  formatiFilter: SelectItem[] = [];

  formatDialog: SelectItem[];

  newFilm: boolean;

  displayDialog: boolean;

  audios: ListItem[] = [];

  category: ListItem[] = [];

  postPath: string;

  loading: boolean;

  rows = 10;

  totalRecords = 0;

  faPlus = faPlus
  faTresh = faTrash
  faCheck = faCheck
  faUpload = faUpload

  @ViewChild('rt') rt: Table;

  constructor(
    private applicationService: ApplicationService,
    private confirmationService: ConfirmationService,
    private filmService: FilmService,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.formats = [
      { label: '', value: '' },
      { label: '4K', value: '4K' },
      { label: 'FULL-HD', value: 'FULL-HD' },
      { label: 'HD', value: 'HD' },
      { label: 'DVD', value: 'DVD' }
    ];

    this.formatDialog = this.formats;
    this.formatDialog.shift();

    this.filmNameAsyncInput.setValue('', { emitEvent: false });
  }

  ngOnInit() {
    this.subscribeToListOfCountry();
    this.subscribeToListOfCategory();
    this.subsrcibeToListOfFilm();
    this.getCols();
    this.getFilmByName();
    this.getFilmByFormat();
  }

  subscribeToListOfCountry() {
    this.applicationService.countriesObservable.subscribe(notification => {
      this.audios = notification;
    });
  }

  subscribeToListOfCategory() {
    this.applicationService.categoriesObservable.subscribe(notification => {
      this.category = notification;
    });
  }

  getCols() {
    this.cols = [
      { field: 'nome', header: 'Titolo' },
      { field: 'anno', header: 'Anno' },
      {
        field: 'categoria',
        header: 'Categoria',
        renderer: (row: Film) => {
          if (row.categoria) {
            return row.categoria.join(', ');
          } else {
            return '-';
          }
        }
      },
      { field: 'formato', header: 'Formato' },
      { field: 'linguaAudio', header: 'Audio' },
      { field: 'linguaSottotitoli', header: 'Sottotitoli' },
      {
        field: 'dataCreazione',
        header: 'Data Inserimento',
        renderer: (row: Film) => {
          if (row.dataCreazione) {
            return this.splitDataFormat(row.dataCreazione.toString());
          } else {
            return '-';
          }
        }
      }
    ];
  }

  subsrcibeToListOfFilm(event?: LazyLoadEvent) {
    let pageNumber = 0;
    let pageSize = 10;
    if (this.filmNameAsyncInput.value?.length > 0) {
      if (event) {
        pageNumber = event.first === 0 ? 0 : event.first / event.rows;
        pageSize = event.rows;
        this.loading = true;
        this.filmService.getAllFilmsByName(this.filmNameAsyncInput.value, pageNumber, pageSize).subscribe(res => {
          this.films = res.content;
          this.totalRecords = res.totalElements;
          this.loading = false;
        });
      } else {
        this.films = this.filmsByFilter;
        this.totalRecords = this.totalRecordsByFilter;
      }
    } else if (this.filmFormatAsyncInput.value?.length > 0) {
      if (event) {
        pageNumber = event.first === 0 ? 0 : event.first / event.rows;
        pageSize = event.rows;
        this.loading = true;
        this.filmService.getAllFilmsByFormat(this.filmFormatAsyncInput.value, pageNumber, pageSize).subscribe(res => {
          this.films = res.content;
          this.totalRecords = res.totalElements;
          this.loading = false;
        });
      } else {
        this.films = this.filmsByFilter;
        this.totalRecords = this.totalRecordsByFilter;
      }
    } else if (event) {
      this.loading = true;
      pageNumber = event.first === 0 ? 0 : event.first / event.rows;
      pageSize = event.rows;
      this.filmService.getFilms(pageNumber, pageSize).subscribe(res => {
        this.films = res.content;
        this.totalRecords = res.totalElements;
        this.loading = false;
      });
    } else {
      this.filmService.getFilms(0, 10).subscribe(res => {
        this.films = res.content;
        this.totalRecords = res.totalElements;
        this.loading = false;
      });
    }
  }

  getFilmByName(): Observable<Film[]> | any {
    this.filmNameAsyncInput.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        tap(_ => {
          this.loading = true;
          return true;
        }),
        switchMap(
          text => {
            if (text) {
              return this.filmService.getAllFilmsByName(text)
              .pipe(
                catchError(err => {
                  this.messageService.add({
                    key: 'filmListTost',
                    severity: 'error', summary: 'Errore', detail: err.error.message
                  });
                  this.loading = false;  
                  return of(null);
                })  
              );  
            } else {
              return of(null);
            }
          }
        ),
      )
      .subscribe({
        next: (res) => {
          if (res) {
            this.filmsByFilter = res.content;
            this.totalRecordsByFilter = res.totalElements;
          }
          this.loading = false;
          this.subsrcibeToListOfFilm(null);
          return res;
        },
        error: (err) => console.log(err)
      });
  }

  getFilmByFormat(): Observable<Film[]> | any {
    this.filmFormatAsyncInput.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap(_ => {
          this.loading = true;
          return true;
        }),
        switchMap(
          format => {
            if (format) {
              return this.filmService.getAllFilmsByFormat(format)
                .pipe(
                  catchError(err => {
                    this.messageService.add({
                      key: 'filmListTost',
                      severity: 'error', summary: 'Errore', detail: err.error.message
                    });
                    this.loading = false;  
                    return of(null);
                  })  
                )
            } else {
              return of(null);
            }
          }
        ),
      )
      .subscribe({
        next: (res) => {
          if (res) {
            this.filmsByFilter = res.content;
            this.totalRecordsByFilter = res.totalElements;
          }
          this.loading = false;
          this.subsrcibeToListOfFilm(null);
          return res;
        },
        error: (err) => console.log(err)
      });
  }

  onRowSelect(event) {
    this.newFilm = false;
    this.film = this.cloneFilm(event.data);
    this.displayDialog = true;
    this.postPath = 'http://localhost:8080/rest/films/locandina/saveLocandinaImage/' + this.filmSelezionato.id;
    setTimeout(() => {
      this.renderer.selectRootElement('#titolo').focus();
    }, 100);
  }

  cloneFilm(r: Film): Film {
    const ric = { _id: null };
    // tslint:disable-next-line:forin
    for (const prop in r) {
      ric[prop] = r[prop];
    }
    return ric;
  }

  showDialogToAdd() {
    this.newFilm = true;
    this.film = { _id: null };
    this.displayDialog = true;
    this.displayDialog = true;
    setTimeout(() => {
      this.renderer.selectRootElement('#titolo').focus();
    }, 100);
  }

  successfulUpload() {
    this.messageService.add({
      key: 'gestioneFilmTost',
      severity: 'success', summary: 'Aggiornamento Locandina Completato', detail: 'Locandina Modificata'
    });
    location.reload();
  }

  errorUpload() {
    this.messageService.add({
      key: 'gestioneFilmTost',
      severity: 'error', summary: 'Immagine Troppo Grande', detail: 'Caricare un\'immagine più piccola!'
    });
  }

  save() {
    if (this.newFilm) {
      this.confirmationService.confirm({
        message: 'Sicuro di voler Inserire questo Film?',
        header: 'Inserimento Film',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.filmService.addFilm(this.film).subscribe(response => {
            if (response !== null) {
              this.films = response as Film[];
              this.film = null;
              this.displayDialog = false;
              this.messageService.add({
                key: 'gestioneFilmTost',
                severity: 'success', summary: 'Inserimento Completato', detail: 'Film Inserito'
              });
            }
          });
        },
        reject: () => {
        }
      });
    } else {
      this.confirmationService.confirm({
        message: 'Sicuro di voler Aggiornare questo Film?',
        header: 'Aggiornamento Film',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.filmService.updateFilm(this.film).subscribe(response => {
            if (response !== null) {
              this.films = response as Film[];
              this.film = null;
              this.displayDialog = false;
              this.messageService.add({
                key: 'gestioneFilmTost',
                severity: 'success', summary: 'Aggiornamento Completato', detail: 'Film Aggiornato'
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
      message: 'Sicuro di voler Eliminare questo Film?',
      header: 'Eliminazione Film',
      icon: 'fa fa-trash',
      accept: () => {
        this.filmService.deleteFilm(this.filmSelezionato._id).subscribe(response => {
          if (response !== null) {
            const index = this.films.indexOf(this.filmSelezionato);
            this.films = this.films.filter((val, i) => i !== index);
            this.film = null;
            this.displayDialog = false;
            this.messageService.add({
              key: 'gestioneFilmTost',
              severity: 'success', summary: 'Eliminazione Completata', detail: 'Film Eliminato'
            });
          }
        });
      },
      reject: () => { }
    });
  }

  deleteLocandina() {
    this.confirmationService.confirm({
      message: 'Sicuro di voler Eliminare la Locandina di questo Film?',
      header: 'Eliminazione Locandina',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.filmSelezionato.locandina = null;
        this.filmService.updateFilm(this.filmSelezionato).subscribe(response => {
          if (response !== null) {
            this.messageService.add({
              key: 'gestioneFilmTost',
              severity: 'success', summary: 'Eliminazione Locandina Completata', detail: 'Locandina Eliminata'
            });
            location.reload();
          } else {
            this.messageService.add({
              key: 'gestioneFilmTost',
              severity: 'error', summary: 'Errore', detail: 'Locandina NON Eliminata'
            });
          }
        });
      },
      reject: () => { }
    });
  }

  close() {
    this.displayDialog = false;
  }

  onYearChange(event, ft) {
    if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
      ft.filter(event.value - 1, 'anno', 'gt');
    }, 250);
  }

  resetFilterForm() {
    this.filmSearchFilterForm.reset();
    this.filmNameAsyncInput.reset();
    this.filmFormatAsyncInput.reset();
    this.subsrcibeToListOfFilm(null);
  }

  splitDataFormat(dataCreazione: string) {
    return dataCreazione.substring(0, 4) + '/' + dataCreazione.substring(4, 6) + '/' +
      dataCreazione.substring(6, 8) + ' ' + dataCreazione.substring(8, 10) + ':' +
      dataCreazione.substring(10, 12) + ':' + dataCreazione.substring(12, 14) ;
  }

  applyFilter(table, event: Event, col, filterMethod) {
    table.filter((event.target as HTMLInputElement).value, col, filterMethod )
  }

}
