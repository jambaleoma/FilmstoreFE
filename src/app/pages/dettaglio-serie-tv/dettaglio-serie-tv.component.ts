import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Serie } from 'src/app/core/_api/models';
import { Stagione } from 'src/app/core/_api/models/stagione';
import { SerieService } from 'src/app/core/_api/services/serie.service';
import { StagioneService } from 'src/app/core/_api/services/stagione.service';

@Component({
  selector: 'app-dettaglio-serie-tv',
  templateUrl: './dettaglio-serie-tv.component.html',
  styleUrls: ['./dettaglio-serie-tv.component.scss']
})
export class DettaglioSerieTvComponent implements OnInit {

  stagioni: Stagione[] = [];
  serie: Serie;
  showSerieDetails = false;
  selectedStagione: Stagione;
  displayDialog: boolean;

  constructor(
    private route: ActivatedRoute,
    private serieTVService: SerieService,
    private stagioneService: StagioneService
  ) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.serieTVService.getSerie(params['id']).subscribe(notificationFilm => {
          this.serie = notificationFilm;
          this.showSerieDetails = true;
          this.stagioneService.getStagioniByIdSerie(this.serie._id).subscribe(notification => {
            this.stagioni = notification;
            this.stagioni.sort(function (a, b) {
              return (a.numeroStagione - b.numeroStagione);
            });
          });
        });
      } else {
        this.showSerieDetails = false;
      }
    });
  }

  ngOnInit() {
  }

  selectSerie(event: Event, stagione: Stagione) {
    this.selectedStagione = stagione;
    this.displayDialog = true;
    event.preventDefault();
  }

  onDialogHide() {
    this.selectedStagione = null;
  }

}
