import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators'

import { Oferta } from "./shared/oferta.model";
import { URL_API } from './app.api';

@Injectable()
export class OfertasService {


    constructor( private http: Http){}

    getOfertas(): Promise<Oferta[]> {
        //Efetuar uma requisição Http
        //retornar uma Promise de Oferta[] 
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
        .toPromise()
        .then((resposta: Response) => resposta.json())
    }

    getOfertaPorCategoria(categoria: string): Promise<Oferta[]>{
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
        .toPromise()
        .then((resposta: Response) => resposta.json())
    }

    getOfertaPorId(id: number): Promise<Oferta>{
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
        .toPromise()
        .then((resposta: Response) => {
            return resposta.json()[0]
        })
    }

    getComoUsarOfertaPorId(id: number): Promise<string>{
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
        .toPromise()
        .then((resposta: Response) => {
            return resposta.json()[0].descricao
        })
    }

    getOndeFicaOfertaPorId(id: number): Promise<string>{
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
        .toPromise()
        .then((resposta: Response) => {
            return resposta.json()[0].descricao
        })
    }

    pesquisaOfertas(termo: string): Observable<Oferta[]>{
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
            .pipe(retry(10))// faz 10 tentativas para a requisição 
            .pipe(map((resposta: Response) => resposta.json()))//o map captura a resposta da stream
    }
}
