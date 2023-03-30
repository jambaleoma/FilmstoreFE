import { ApplicationService } from './core/_service/application.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

import audioFileJson from './../assets/JSON/audio&subtitle.json';
import categoryJson from './../assets/JSON/category.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private applicationService: ApplicationService,
    private config: PrimeNGConfig,
    private translateService: TranslateService) {
    this.translateService.setDefaultLang('it');
    this.translateService.use('it');
    this.translateService.get('primeng').subscribe(
      res => this.config.setTranslation(res)
    );
  }

  ngOnInit() {
    this.applicationService.setCountriesItems(audioFileJson.audioFile);
    this.applicationService.setCategoriesItems(categoryJson.category);
  }
}
