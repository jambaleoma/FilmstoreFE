import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, mergeMap, catchError, of } from 'rxjs';
import { ApiConfiguration } from '../api-configuration';
import { BaseService } from '../base-service';
import { Film } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AsyncPipeService extends BaseService{

  constructor(
    private httpClient: HttpClient,
    config: ApiConfiguration
  ) {
    super(config, httpClient);
  }

  getFilmByName$(input: FormControl) {
    return input.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        mergeMap(
          text => this.httpClient.get<Film[]>(this.rootUrl + `rest/films/byName/` + text )
            .pipe(
              catchError(err => of(null))
            )
        ),
      );
  }
  
}
