import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { catchError, debounceTime, distinctUntilChanged, Observable, of, retry, switchMap, tap } from 'rxjs';
import { Film, ListItem } from 'src/app/core/_api/models';
import { PageResponse } from 'src/app/core/_api/models/pageResponse';
import { FilmService } from 'src/app/core/_api/services/film.service';
import { ApplicationService } from 'src/app/core/_service/application.service';

@Component({
  selector: 'app-ricerca-film',
  templateUrl: './ricerca-film.component.html',
  styleUrls: ['./ricerca-film.component.scss']
})
export class RicercaFilmComponent implements OnInit {

  public filmSearchFilterForm = this.fb.nonNullable.group({
    name: [''],
    format: [''],
    category: [''],
    yearRange: ['']
  });

  filters: any = {};

  public filmNameAsyncInput = new FormControl('');

  public filmFormatAsyncInput = new FormControl();

  public filmCategoryAsyncInput = new FormControl();

  public filmYearAsyncInput = new FormControl();

  public filteredFilm$: Observable<PageResponse | null> = new Observable<PageResponse | null>;

  pageResponse: PageResponse;

  films: Film[];
  
  filmsByFilter: Film[];

  totalRecordsByFilter = 0;

  cols: any[];

  formats: ListItem[];

  category: ListItem[];

  currentOlderYearFilm: number[];

  maxYear: number;

  minYear: number;

  rangeValues: number;

  yearFilter: number;

  yearTimeout: any;

  faSearch = faSearch;

  rows = 10;

  totalRecords = 0;

  loading: boolean;

  @ViewChild('ft') table: Table;

  constructor(
    private router: Router,
    private filmService: FilmService,
    private applicationService: ApplicationService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {

    this.formats = [
      { _id: '0', label: '4K', value: '4K' },
      { _id: '1', label: 'FULL-HD', value: 'FULL-HD' },
      { _id: '2', label: 'HD', value: 'HD' },
      { _id: '3', label: 'DVD', value: 'DVD' }
    ];

    this.filmNameAsyncInput.setValue('', { emitEvent: false });

  }

  ngOnInit() {
    this.subscribeToCurrentOlderYearFillms();
    this.subscribeToListOfCategory();
    this.getColumns();
    this.getFilmByName();
    this.getFilmByFormat();
    this.getFilmByCategory();
  }

  getColumns() {
    this.cols = [
      { field: 'nome', header: 'Titolo' },
      { field: 'anno', header: 'Anno' },
      { field: 'formato', header: 'Formato' },
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
      }
    ];
  }

  loadFilms(event?: LazyLoadEvent) {
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
    } else if (this.filmCategoryAsyncInput.value?.length > 0) {
      if (event) {
        pageNumber = event.first === 0 ? 0 : event.first / event.rows;
        pageSize = event.rows;
        this.loading = true;
        this.filmService.getAllFilmsByCategory(this.filmCategoryAsyncInput.value, pageNumber, pageSize).subscribe(res => {
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
          this.loadFilms(null);
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
          this.loadFilms(null);
          return res;
        },
        error: (err) => console.log(err)
      });
  }

  getFilmByCategory(): Observable<Film[]> | any {
    this.filmCategoryAsyncInput.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap(_ => {
          this.loading = true;
          return true;
        }),
        switchMap(
          categoriesValue => {
            if (categoriesValue?.length > 0) {
              return this.filmService.getAllFilmsByCategory(categoriesValue)
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
          this.loadFilms(null);
          return res;
        },
        error: (err) => console.log(err)
      });
  }

  subscribeToCurrentOlderYearFillms() {
    this.filmService.getOlderYearFilms().subscribe(notification => {
      this.currentOlderYearFilm = notification.split('-').map((year) => {
        return parseInt(year, 10);
      });
      this.minYear = this.currentOlderYearFilm[0];
      this.maxYear = this.currentOlderYearFilm[1];
      this.rangeValues = this.minYear;
    });
  }

  subscribeToListOfCategory() {
    this.applicationService.categoriesObservable.subscribe(notification => {
      this.category = notification;
    });
  }

  //  *** Vado a visulizzare nel dattaglio il film selezionato ***
  goToFilm(filmId: string) {
    this.router.navigate(['filmStore/Film/view', filmId]);
  }

  onYearChange(event) {
    if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
    }
    this.yearTimeout = setTimeout(() => {
      this.yearFilter = event.value; 
    }, 0);
  }

  applyFilter(table, event: Event, col, filterMethod) {
    table.filter((event.target as HTMLInputElement).value, col, filterMethod)
  }

  resetFilterForm() {
    this.filmSearchFilterForm.reset();
    this.filmNameAsyncInput.reset();
    this.filmFormatAsyncInput.reset();
    this.filmCategoryAsyncInput.reset();
    this.filmYearAsyncInput.reset();
    this.loadFilms(null);
  }

}
