import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { catchError, debounceTime, distinctUntilChanged, isEmpty, map, Observable, of, retry, switchMap, tap } from 'rxjs';
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
    name: '',
    format: '',
    category: '',
    yearRange: ''
  });

  filters: any = {};

  public filmNameAsyncInput = new FormControl('');

  public filmFormatAsyncInput = new FormControl();

  public filmCategoryAsyncInput = new FormControl();

  public filmYearAsyncInput = new FormControl();

  public filteredFilm$: Observable<PageResponse | null> = new Observable<PageResponse | null>;

  pageResponse: PageResponse;

  films: Film[];

  filmsByCategory: Film[];

  cols: any[];

  formats: ListItem[];

  category: ListItem[];

  currentOlderYearFilm: number[];

  maxYear: number;

  minYear: number;

  yearFilter: number;

  yearTimeout: any;

  blockedDocument = false;

  loadingComplete = false;

  faSearch = faSearch;

  first = 0;

  rows = 10;

  totalRecords = 0;

  loading: boolean;

  filterActivate = false;

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
    if (event) {
      this.loading = true;
      const pageNumber = event.first === 0 ? 0 : event.first / event.rows;
      const pageSize = event.rows;
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
          text => this.filmService.getAllFilmsByName(text)
          .pipe(
            catchError(err => {
              this.messageService.add({
                key: 'filmListTost',
                severity: 'error', summary: 'Errore', detail: err.error.message
              });
              this.loading = false;  
              return of(null)
            })  
          )
        ),
      )
      .subscribe({
        next: (res) => {
          if (res) {
            this.filterActivate = true
          } else {
            setTimeout(() => {
              location.reload();              
            }, 1500);
          }
          this.loading = false;
          this.films = res;
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
    });
  }

  subscribeToListOfCategory() {
    this.applicationService.categoriesObservable.subscribe(notification => {
      this.category = notification;
    });
  }

  blockDocument() {
    this.blockedDocument = true;
  }

  unBlockDocument() {
    this.blockedDocument = false;
  }

  findForCategory(category: string[], ft: Table) {
    this.blockDocument();
    if (category[0]) {
      this.films = [];
      this.filmService.getFilms().subscribe(notification => {
        if (notification) {
          this.unBlockDocument();
          for (const singleCategory of category) {
            this.filmsByCategory = notification.content.filter(film => film.categoria.includes(singleCategory));
            this.filmsByCategory.forEach(film => {
              if (!this.films.includes(film)) {
                this.films.push(film);
              }
            });
          }
          ft.reset();
        }
      });
    } else {
      this.loadFilms();
    }
  }

  //  *** Reset Valori selzionati nei Filtri ***
  reset(ft: Table) {
    this.first = 0;
    ft.reset();
    this.filters = {};
    this.yearFilter = null;
    this.loadFilms();
  }

  //  *** Vado a visulizzare nel dattaglio il film selezionato ***
  goToFilm(filmId: string) {
    this.router.navigate(['filmStore/Film/view', filmId]);
  }

  onYearChange(event, ft) {
    if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
      ft.filter(event.value - 1, 'anno', 'gt');
    }, 250);
  }

  applyFilter(table, event: Event, col, filterMethod) {
    table.filter((event.target as HTMLInputElement).value, col, filterMethod)
  }

}
