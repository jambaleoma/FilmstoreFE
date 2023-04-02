/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';

import { Film } from '../models/film';
import { Observable, filter, map } from 'rxjs';
import { PageResponse } from '../models/pageResponse';

@Injectable()
export class FilmService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return List of Films
   */
  private getFilmsResponse(pageNumber: number, pageSize: number): Observable<HttpResponse<PageResponse>> {
    let queryParams = new HttpParams().append("pageNumber", pageNumber).append("pageSize", pageSize).append("sortBy", "id").append("sortDirection", "DESC");
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `rest/films/pageAll`,
      __body,
      {
        headers: __headers,
        params: queryParams,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: PageResponse = null;
        _body = _resp.body as PageResponse;
        return _resp.clone({ body: _body }) as HttpResponse<PageResponse>;
      })
    );
  }

  /**
   * @return List of Films
   */
  getFilms(pageNumber: number = 0, pageSize: number = 10): Observable<PageResponse> {
    return this.getFilmsResponse(pageNumber, pageSize).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @return List of Films By Name
   */
  private getAllFilmsByNameResponse(name: string, pageNumber: number = 0, pageSize: number = 10): Observable<HttpResponse<PageResponse>> {
    let queryParams = new HttpParams().append("pageNumber", pageNumber).append("pageSize", pageSize).append("sortBy", "id").append("sortDirection", "DESC");
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `rest/films/byName/` + name,
      __body,
      {
        headers: __headers,
        params: queryParams,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: PageResponse = null;
        _body = _resp.body as PageResponse;
        return _resp.clone({ body: _body }) as HttpResponse<PageResponse>;
      })
    );
  }

  /**
   * @return List of Films By Name
   */
  getAllFilmsByName(name: string, pageNumber: number = 0, pageSize: number = 10): Observable<PageResponse> {
    return this.getAllFilmsByNameResponse(name, pageNumber, pageSize).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @return List of Films By Format
   */
  private getAllFilmsByFormatResponse(format: string, pageNumber: number = 0, pageSize: number = 10): Observable<HttpResponse<PageResponse>> {
    let queryParams = new HttpParams().append("pageNumber", pageNumber).append("pageSize", pageSize).append("sortBy", "id").append("sortDirection", "DESC");
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `rest/films/byFormat/` + format,
      __body,
      {
        headers: __headers,
        params: queryParams,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: PageResponse = null;
        _body = _resp.body as PageResponse;
        return _resp.clone({ body: _body }) as HttpResponse<PageResponse>;
      })
    );
  }

  /**
   * @return List of Films By Name
   */
  getAllFilmsByFormat(format: string, pageNumber: number = 0, pageSize: number = 10): Observable<PageResponse> {
    return this.getAllFilmsByFormatResponse(format, pageNumber, pageSize).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @return List of Films By Category
   */
  private getAllFilmsByCategoryResponse(categories: string, pageNumber: number = 0, pageSize: number = 10): Observable<HttpResponse<PageResponse>> {
    let queryParams = new HttpParams().append("pageNumber", pageNumber).append("pageSize", pageSize).append("sortBy", "id").append("sortDirection", "DESC");
    let __headers = new HttpHeaders();
    let __body: any = categories;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `rest/films/byCategory`,
      __body,
      {
        headers: __headers,
        params: queryParams,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: PageResponse = null;
        _body = _resp.body as PageResponse;
        return _resp.clone({ body: _body }) as HttpResponse<PageResponse>;
      })
    );
  }

  /**
   * @return List of Films By Name
   */
  getAllFilmsByCategory(categories: string, pageNumber: number = 0, pageSize: number = 10): Observable<PageResponse> {
    return this.getAllFilmsByCategoryResponse(categories, pageNumber, pageSize).pipe(
      map(_r => _r.body)
    );
  }


    /**
   * @return Older year of Films
   */
  private getOlderYearFilmsResponse(): Observable<HttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `rest/films/recentOlderYear`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: string = null;
        _body = _resp.body as string;
        return _resp.clone({ body: _body }) as HttpResponse<string>;
      })
    );
  }

  /**
   * @return List of Films
   */
  getOlderYearFilms(): Observable<string> {
    return this.getOlderYearFilmsResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @return List of New Films
   */
  private getNewFilmsResponse(numeberOfNewFilm: string): Observable<HttpResponse<Film[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `rest/films/allNewFilms/` + numeberOfNewFilm,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Film[] = null;
        _body = _resp.body as Film[];
        return _resp.clone({ body: _body }) as HttpResponse<Film[]>;
      })
    );
  }

  /**
   * @return List of New Films
   */
  getNewFilms(numeberOfNewFilm: string): Observable<Film[]> {
    return this.getNewFilmsResponse(numeberOfNewFilm).pipe(
      map(_r => _r.body)
    );
  }


  /**
   * @return List of Films
   */
  private getFilmsByCategoryResponse(category: string): Observable<HttpResponse<Film[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `rest/films/byCategory/`+category,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Film[] = null;
        _body = _resp.body as Film[];
        return _resp.clone({ body: _body }) as HttpResponse<Film[]>;
      })
    );
  }

  /**
   * @return List of Films
   */
  getFilmsByCategory(category: string): Observable<Film[]> {
    return this.getFilmsByCategoryResponse(category).pipe(
      map(_r => _r.body)
    );
  }


  /**
   * @return Single Film
   */
  private getFilmResponse(filmId: string): Observable<HttpResponse<Film>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `rest/films/` + filmId,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Film[] = null;
        _body = _resp.body as Film[];
        return _resp.clone({ body: _body }) as HttpResponse<Film>;
      })
    );
  }

  /**
   * @return Single Film
   */
  getFilm(idFilm: string): Observable<Film> {
    return this.getFilmResponse(idFilm).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param body Film
   * @return Added Film
   */
  private addFilmResponse(body: Film): Observable<HttpResponse<Film[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `rest/films/insertFilm`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Film[] = null;
        _body = _resp.body as Film[];
        return _resp.clone({ body: _body }) as HttpResponse<Film[]>;
      })
    );
  }

  /**
   * @param body Film
   * @return Added Film
   */
  addFilm(body: Film): Observable<Film[]> {
    return this.addFilmResponse(body).pipe(
      map(_r => _r.body)
    );
  }

  /**
   *
   * - `id`:
   *
   * - `body`:
   *
   * @return Updated Film
   */
  private updateFilmResponse(params: Film): Observable<HttpResponse<Film[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + 'rest/films/upDateFilmById/' + params.id,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Film[] = null;
        _body = _resp.body as Film[];
        return _resp.clone({body: _body}) as HttpResponse<Film[]>;
      })
    );
  }

  /**
   *
   * - `id`:
   *
   * - `body`:
   *
   * @return Updated Film
   */
  updateFilm(params: Film): Observable<Film[]> {
    return this.updateFilmResponse(params).pipe(
      map(_r => _r.body)
    );
  }


  /**
   * @param id undefined
   * @return Deleted status
   */
  private deleteFilmResponse(id: string): Observable<HttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + 'rest/films/deleteFilmById/' + id,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: boolean = null;
        _body = _resp.body == 'true';
        return _resp.clone({body: _body}) as HttpResponse<boolean>;
      })
    );
  }

  /**
   * @param id undefined
   * @return Deleted status
   */
  deleteFilm(id: string): Observable<boolean> {
    return this.deleteFilmResponse(id).pipe(
      map(_r => _r.body)
    );
  }

}
