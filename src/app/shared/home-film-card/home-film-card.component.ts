import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-home-film-card',
  templateUrl: './home-film-card.component.html',
  styleUrls: ['./home-film-card.component.scss']
})
export class HomeFilmCardComponent {

  @Input() header: string;
  @Input() subheader: string;
  @Input() imgPath: string;
  @Input() body: string;
  @Input() isAdmin: boolean;
  @Input() leftButtonClick: string;
  @Input() rightButtonClick: string;
  @Input() leftButtonLabel: string;
  @Input() rightButtonLabel: string;
  @Input() leftButtonIcon: IconProp;
  @Input() rightButtonIcon: IconProp;

  constructor(
    private router: Router
  ) {}

  leftButtonOnClick() {
    this.router.navigate([this.leftButtonClick]);
  }

  rightButtonOnClick() {
    if (this.rightButtonClick === 'filmStore/richieste/view') {
      this.router.navigate([this.rightButtonClick, sessionStorage.getItem('customerfirstName')]);
    } else {
      this.router.navigate([this.rightButtonClick]);
    }
  }

}
