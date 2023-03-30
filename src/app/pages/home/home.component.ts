import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { faCog, faVideo, faFilm, faUsers, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Customer, Film, Serie } from 'src/app/core/_api/models';
import { FilmService } from 'src/app/core/_api/services/film.service';
import { SerieService } from 'src/app/core/_api/services/serie.service';
import { ApplicationService } from 'src/app/core/_service/application.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  showSerieTvAdminDialog = false;
  loggedCustomer: Customer;
  recommendedFilms: Film[];
  recommendedFilmsToPut: Film[] = [];
  recommendedfilmNumber = 3;
  newFilms: Film[] = [];
  newfilmsNumber = '3';
  newSerie: Serie[] = [];
  newSerieNumber = '3';
  loadFooter = true;
  categoriaPreferita: string;
  faCog = faCog;
  faVideo = faVideo;
  faFilm = faFilm;
  faUsers = faUsers;
  faPlus = faPlus;
  

  constructor(
    private filmSerive: FilmService,
    private serieService: SerieService,
    private router: Router,
    private messageService: MessageService,
    private applicationService: ApplicationService,
    private renderer: Renderer2,
  ) {
    this.renderer.removeClass(document.body, 'backImage');
  }

  ngOnInit() {
    this.loggedCustomer = JSON.parse(sessionStorage.getItem('customer'));
    if (this.loggedCustomer?.categoriePreferite && this.loggedCustomer.categoriePreferite.length > 0) {
      this.getRecommendedFilm();
    }
    this.getNewFilm();
    this.getNewSerie();
  }

  ngAfterViewInit(): void {
    if (this.applicationService.getShowWelcome()) {
      this.messageService.add({
        key: 'homeTost',
        severity: 'success',
        summary: 'Accesso Eseguito',
        detail: (this.loggedCustomer.sesso === 'Maschio' ? 'Bentornato ' : 'Bentornata ') + this.loggedCustomer.firstName
      });
      this.applicationService.setFalseShowWelcome();
    }
  }

  getNewFilm() {
    this.filmSerive.getNewFilms(this.newfilmsNumber).subscribe(notification => {
      this.newFilms = notification;
    });
  }

  getNewSerie() {
    this.serieService.getNewSerie(this.newSerieNumber).subscribe(notification => {
      this.newSerie = notification;
      this.loadFooter = true;
    });
  }

  getRecommendedFilm() {
    if (this.loggedCustomer) {
      const index = Math.floor(Math.random() * this.loggedCustomer.categoriePreferite.length);
      this.categoriaPreferita = this.loggedCustomer.categoriePreferite[index];
      this.filmSerive.getFilmsByCategory(this.categoriaPreferita).subscribe(notification => {
        if (notification) {
          const films = notification;
          for (let i = 0; i < this.recommendedfilmNumber; i++) {
            if (films[i] && this.recommendedFilmsToPut) {
              if (!this.recommendedFilmsToPut.find(f => f._id === (films[i]._id || films[i].id))) {
                this.recommendedFilmsToPut.push(films[i]);
              } else {
                i--;
              }
            }
          }
        } else {
          this.getRecommendedFilm();
        }
        this.recommendedFilms = this.recommendedFilmsToPut;
      });
    }
  }

  showDetailsFilm(filmId: string) {
    this.router.navigate(['filmStore/Film/view', filmId]);
  }

  showDetailsSerie(serieId: string) {
    this.router.navigate(['filmStore/SerieTV/view', serieId]);
  }

  goToPersonalPrifile() {
    this.router.navigate(['filmStore/profiloUtente']);
  }
}
