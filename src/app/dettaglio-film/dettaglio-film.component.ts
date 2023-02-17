import { getTestBed } from '@angular/core/testing';
import { VotoService } from './../_api/services/voto.service';
import { FilmService } from '../_api/services/film.service';
import { Film } from '../_api/models/film';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Voto, Customer } from '../_api/models';
import { CustomerService } from '../_api/services/customer.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dettaglio-film',
  templateUrl: './dettaglio-film.component.html',
  styleUrls: ['./dettaglio-film.component.scss']
})
export class DettaglioFilmComponent {

  films: Film[] = [];
  voto: Voto = {};
  showFilmDetails = false;
  loggedCustomer: Customer;
  dislike: boolean;
  pipe: DatePipe = new DatePipe('it');

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private votoService: VotoService,
    private customerService: CustomerService
  ) {
    this.voto = {
      voto_id: null,
    };
    this.customerService.getCustomerByName(sessionStorage.getItem('customerfirstName')).subscribe(notificationCustomer => {
      this.loggedCustomer = notificationCustomer;
      this.route.params.subscribe(params => {
        if (params['id']) {
          this.filmService.getFilm(params['id']).subscribe(notificationFilm => {
            this.films.push(notificationFilm);
            this.showFilmDetails = true;
            this.votoService.getVotiByIdFilm_IdCustomer(params['id'], notificationCustomer.id).subscribe(notificationOldVoto => {
              if (notificationOldVoto) {
                this.voto = notificationOldVoto;
              } else {
                this.voto.idFilm = notificationFilm._id || notificationFilm.id;
                this.voto.nomeFilm = notificationFilm.nome;
                this.voto.idCustomer = this.loggedCustomer.id;
                this.voto.firstNameCustomer = this.loggedCustomer.firstName;
                this.voto.lastNameCustomer = this.loggedCustomer.lastName;
                this.voto.dataCreazioneVoto = this.pipe.transform(new Date(), 'fullDate'),
                this.votoService.addVoto(this.voto).subscribe(notificationNewVoto => {
                  this.voto = notificationNewVoto.find(v => (v.idFilm === this.voto.idFilm && v.idCustomer === this.voto.idCustomer));
                });
              }
              if (this.voto.like === true) {
                this.dislike = false;
              } else if (this.voto.like === false) {
                this.dislike = true;
              } else if (!this.voto.like) {
                this.dislike = null;
              }
            });
          });
        } else {
          this.showFilmDetails = false;
        }
      });
    });
  }

  upDateVoto() {
    this.voto.idFilm = this.films[0]._id || this.films[0].id;
    this.voto.idCustomer = this.loggedCustomer.id;
    // Up-Date Voto
    if (this.voto.voto_id) {
      this.votoService.updateVoto(this.voto).subscribe(notificationUpdateVoto => {
        this.voto = notificationUpdateVoto;
      });
    } else {
      this.votoService.getVoto(this.voto.id).subscribe(notificationGetVoto => {
        if (notificationGetVoto) {
          this.votoService.updateVoto(this.voto).subscribe(notificationUpdateVoto => {
            this.voto = notificationUpdateVoto;
          });
        } else {
          this.voto.nomeFilm = this.films[0].nome;
          this.voto.firstNameCustomer = this.loggedCustomer.firstName;
          this.voto.lastNameCustomer = this.loggedCustomer.lastName;
          this.voto.dataCreazioneVoto = this.pipe.transform(new Date(), 'fullDate'),
          this.votoService.addVoto(this.voto).subscribe(notificationNewVoto => {
            this.voto = notificationNewVoto.find(v => (v.idFilm === this.voto.idFilm && v.idCustomer === this.voto.idCustomer));
          });
        }
      });
    }
  }

  likeFilm() {
    this.dislike = false;
    this.upDateVoto();
  }

  dislikeFilm() {
    this.voto.like = false;
    this.upDateVoto();
  }

}
