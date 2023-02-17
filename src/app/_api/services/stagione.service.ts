/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Stagione } from '../models/stagione';
import { Observable, filter, map } from 'rxjs';

@Injectable()
export class StagioneService extends BaseService {
    constructor(
        config: ApiConfiguration,
        http: HttpClient
    ) {
        super(config, http);
    }


    /**
    * @return List of Stagioni
    */
    private getStagioniResponse(): Observable<HttpResponse<Stagione[]>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;
        let req = new HttpRequest<any>(
            "GET",
            this.rootUrl + `rest/stagioni/all`,
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
                let _body: Stagione[] = null;
                _body = _resp.body as Stagione[];
                return _resp.clone({ body: _body }) as HttpResponse<Stagione[]>;
            })
        );
    }

    /**
     * @return List of Stagioni
     */
    getStagioni(): Observable<Stagione[]> {
        return this.getStagioniResponse().pipe(
            map(_r => _r.body)
        );
    }


       /**
    * @return List of Stagioni By SerieId
    */
   private getStagioniByIdSerieResponse(SerieId: string): Observable<HttpResponse<Stagione[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `rest/stagioni/bySerieId/` + SerieId,
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
        let _body: Stagione[] = null;
        _body = _resp.body as Stagione[];
        return _resp.clone({body: _body}) as HttpResponse<Stagione[]>;
      })
    );
  }

  /**
   * @return List of Richiste
   */
  getStagioniByIdSerie(serieId: string): Observable<Stagione[]> {
    return this.getStagioniByIdSerieResponse(serieId).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param body Stagione
   * @return Added Stagione
   */
  private addStagioneResponse(body: Stagione): Observable<HttpResponse<Stagione[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `rest/stagioni/insertStagione`,
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
        let _body: Stagione[] = null;
        _body = _resp.body as Stagione[];
        return _resp.clone({body: _body}) as HttpResponse<Stagione[]>;
      })
    );
  }

  /**
   * @param body Stagione
   * @return Added Stagione
   */
   addStagione(body: Stagione): Observable<Stagione[]> {
    return this.addStagioneResponse(body).pipe(
      map(_r => _r.body)
    );
  }

  /**
     *
     * - `id`: 
     *
     * - `body`: 
     *
     * @return Updated Stagione
     */
    private updateStagioneResponse(params: Stagione): Observable<HttpResponse<Stagione[]>> {
      let __params = this.newParams();
      let __headers = new HttpHeaders();
      let __body: any = null;

      __body = params;
      let req = new HttpRequest<any>(
          "PUT",
          this.rootUrl + 'rest/stagioni/upDateStagioneById/' + params.id,
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
              let _body: Stagione[] = null;
              _body = _resp.body as Stagione[];
              return _resp.clone({ body: _body }) as HttpResponse<Stagione[]>;
          })
      );
  }

  /**
   *
   * - `id`: 
   *
   * - `body`: 
   *
   * @return Updated Stagione
   */
  updateStagione(params: Stagione): Observable<Stagione[]> {
      return this.updateStagioneResponse(params).pipe(
          map(_r => _r.body)
      );
  }


  /**
   * @param id undefined
   * @return Deleted status
   */
  private deleteStagioneResponse(id: string): Observable<HttpResponse<boolean>> {
      let __params = this.newParams();
      let __headers = new HttpHeaders();
      let __body: any = null;

      let req = new HttpRequest<any>(
          "DELETE",
          this.rootUrl + 'rest/stagioni/deleteStagioneById/' + id,
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
              return _resp.clone({ body: _body }) as HttpResponse<boolean>;
          })
      );
  }

  /**
   * @param id undefined
   * @return Deleted status
   */
  deleteStagione(id: string): Observable<boolean> {
      return this.deleteStagioneResponse(id).pipe(
          map(_r => _r.body)
      );
  }

    /**
   * @param id undefined
   * @return Deleted status
   */
  private deleteStagioniBySerieIdResponse(id: string): Observable<HttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
        "DELETE",
        this.rootUrl + 'rest/stagioni/deleteStagioniBySerieId/' + id,
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
            return _resp.clone({ body: _body }) as HttpResponse<boolean>;
        })
    );
}

/**
 * @param id undefined
 * @return Deleted status
 */
deleteStagioniBySerieId(id: string): Observable<boolean> {
    return this.deleteStagioniBySerieIdResponse(id).pipe(
        map(_r => _r.body)
    );
}

}