import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'primeng/table';
import { Serie, ListItem } from 'src/app/core/_api/models';
import { SerieService } from 'src/app/core/_api/services/serie.service';

@Component({
  selector: 'app-ricerca-serie-tv',
  templateUrl: './ricerca-serie-tv.component.html',
  styleUrls: ['./ricerca-serie-tv.component.scss']
})
export class RicercaSerieTvComponent implements OnInit {

  filters: any = {};

  serieTV: Serie[] = [];

  cols: any[];

  formats: ListItem[];

  stagioneFilter: number;

  stagioneTimeout: any;

  faSearch = faSearch;

  @ViewChild('stvt') table: Table;

  constructor(
    private router: Router,
    private serieTVService: SerieService
  ) {

    this.formats = [
      { _id: '1', label: 'FULL-HD', value: 'FULL-HD' },
      { _id: '2', label: 'WEB', value: 'WEB' }
    ];

   }

  ngOnInit() {
    this.subsrcibeToListOfSerieTVs();
    this.getColumns();
  }

  getColumns() {
    this.cols = [
      { field: 'nome', header: 'Titolo' }
    ];
  }

  subsrcibeToListOfSerieTVs() {
    this.serieTVService.getSerieTVs().subscribe(notification => {
      if (notification) {
        this.serieTV = notification;
      }
    });
  }

  //  *** Reset Valori selzionati nei Filtri ***
  reset(stvt: Table) {
    stvt.reset();
    this.filters = {};
    this.stagioneFilter = null;
  }

  //  *** Vado a visulizzare nel dattaglio la Serie TV selezionata ***
  goToSerie(serieId: string) {
    this.router.navigate(['filmStore/SerieTV/view', serieId]);
  }

  applyFilter(table, event: Event, col, filterMethod) {
    table.filter((event.target as HTMLInputElement).value, col, filterMethod )
  }

}
