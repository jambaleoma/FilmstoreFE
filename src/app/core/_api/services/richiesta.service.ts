import { Richiesta } from '../models/richiesta';
/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse,
  HttpHeaders} from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable, filter, map } from 'rxjs';

@Injectable()
export class RichiestaService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return List of Richiste
   */
   private getRichiesteResponse(): Observable<HttpResponse<Richiesta[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `rest/richieste/all`,
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
        let _body: Richiesta[] = null;
        _body = _resp.body as Richiesta[];
        return _resp.clone({body: _body}) as HttpResponse<Richiesta[]>;
      })
    );
  }

  /**
   * @return List of Richiste
   */
   getRichieste(): Observable<Richiesta[]> {
    return this.getRichiesteResponse().pipe(
      map(_r => _r.body)
    );
  }


  /**
   * @return Single Richiesta
   */
  private getRichiestaResponse(richiestaId: string): Observable<HttpResponse<Richiesta>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `rest/richieste/`+richiestaId,
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
        let _body: Richiesta = null;
        _body = _resp.body as Richiesta;
        return _resp.clone({body: _body}) as HttpResponse<Richiesta>;
      })
    );
  }

  /**
   * @return Single Richiesta
   */
   getRichiesta(richiestaId: string): Observable<Richiesta> {
    return this.getRichiestaResponse(richiestaId).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param body Richiesta
   * @return Added Richiesta
   */
  private addRichiestaResponse(body: Richiesta): Observable<HttpResponse<Richiesta[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `rest/richieste/insertRichiesta`,
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
        let _body: Richiesta[] = null;
        _body = _resp.body as Richiesta[];
        return _resp.clone({body: _body}) as HttpResponse<Richiesta[]>;
      })
    );
  }

  /**
   * @param body Richiesta
   * @return Added Richiesta
   */
   addRichiesta(body: Richiesta): Observable<Richiesta[]> {
    return this.addRichiestaResponse(body).pipe(
      map(_r => _r.body)
    );
  }


   /**
   * @param params The `RichiestaService.UpdateRichiestaParams` containing the following parameters:
   *
   * - `id`: 
   *
   * - `body`: 
   *
   * @return Updated Richiesta
   */
  private updateRichiestaResponse(params: Richiesta): Observable<HttpResponse<Richiesta[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `rest/richieste/upDateRichiesta/`+params.id,
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
        let _body: Richiesta[] = null;
        _body = _resp.body as Richiesta[];
        return _resp.clone({body: _body}) as HttpResponse<Richiesta[]>;
      })
    );
  }

  /**
   * @param params The `RichiestaService.UpdateRichiestaParams` containing the following parameters:
   *
   * - `id`: 
   *
   * - `body`: 
   *
   * @return Updated Richiesta
   */
   updateRichiesta(params: Richiesta): Observable<Richiesta[]> {
    return this.updateRichiestaResponse(params).pipe(
      map(_r => _r.body)
    );
  }


  /**
   * @param id undefined
   * @return Deleted status
   */
  private deleteRichiestaResponse(id: string): Observable<HttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `rest/richieste/deleteRichiestaById/`+id,
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
   deleteRichiesta(id: string): Observable<boolean> {
    return this.deleteRichiestaResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @return List of Richiste By CustomerName
   */
  private getRichiesteByCustomerNameResponse(nome: string): Observable<HttpResponse<Richiesta[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `rest/richieste/byNomeCliente/`+nome,
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
        let _body: Richiesta[] = null;
        _body = _resp.body as Richiesta[];
        return _resp.clone({body: _body}) as HttpResponse<Richiesta[]>;
      })
    );
  }

  /**
   * @return List of Richiste
   */
  getRichiesteByCustomerName(nome: string): Observable<Richiesta[]> {
    return this.getRichiesteByCustomerNameResponse(nome).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @return List of Richiste for Statistics  
   */
  private getRichiesteForStatisticsResponse(anno: string): Observable<HttpResponse<number[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `rest/richieste/statistics/richieste2Years/`+anno,
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
        let _body: number[] = null;
        _body = _resp.body as number[];
        return _resp.clone({body: _body}) as HttpResponse<number[]>;
      })
    );
  }

  /**
   * @return List of Richiste for Statistics
   */
   getRichiesteForStatistics(anno: string): Observable<number[]> {
    return this.getRichiesteForStatisticsResponse(anno).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @return List of Richiste for Statistics  
   */
  private getRichiesteYearForStatisticsResponse(): Observable<HttpResponse<string[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `rest/richieste/statistics/years`,
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
        let _body: string[] = null;
        _body = _resp.body as string[];
        return _resp.clone({body: _body}) as HttpResponse<string[]>;
      })
    );
  }

  /**
   * @return List of Richiste for Statistics
   */
  getRichiesteYearForStatistics(): Observable<string[]> {
    return this.getRichiesteYearForStatisticsResponse().pipe(
      map(_r => _r.body)
    );
  }
  
}