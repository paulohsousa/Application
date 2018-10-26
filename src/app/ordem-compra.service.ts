import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';

import { Pedido } from './shared/pedido.model'
import { URL_API } from './app.api';

@Injectable()
export class OrdemCompraService{

    //servico criado para fazer requisições http(get, post e etc)
    constructor(private http: Http){}


    public efetivarCompra(pedido: Pedido): Observable<number>{

        let headers: Headers = new Headers()//objeto criado para ser encaminhado no headers do request

        headers.append('Content-type', 'application/json')//setar para a requisição o que tem no conteudo do request, neste caso um json

        //o metodo post espera redeceber tres parametros url, body, request options
        return this.http.post(
            `${URL_API}/pedidos`,
            JSON.stringify(pedido),//body de uma requisição suporta apenas string, o body é o conteudo do post
            new RequestOptions({ headers: headers })//
        )
        .pipe(map((resposta: Response) => resposta.json()))
    } 
}