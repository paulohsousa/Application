import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model'

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [
    OfertasService
  ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  //public ofertas2: Oferta[]// recebe o retorno atribuido a ofertas, mas para trabalhar no template tem que ser do tipo Oferta[] e não  Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
      .pipe(debounceTime(1000))//executa a ação do switchMap após um segundo
      .pipe(distinctUntilChanged())// evita que requisições identicas sejam feitas
      .pipe(switchMap((termo: string) => {

        //logica para não retornar todos os dados quando o termo for vazio
        if(termo.trim() === ''){          
          return of<Oferta[]>([])//retornar um obervable de array de ofertas vazio
        }

        return this.ofertasService.pesquisaOfertas(termo)
      }))
      .pipe(catchError((erro: any) => {
        console.log(erro)
        return of<Oferta[]>([])
      }))

      /* Implementado pipe async no lugar deste na view do componente
      this.ofertas.subscribe((ofertas: Oferta[]) => {
        console.log(ofertas)
        this.ofertas2 = ofertas
      })*/
  }
  
  public pesquisa(termoDaPesquisa: string): void {
    this.subjectPesquisa.next(termoDaPesquisa)
  }

  public LimpaPesquisa(): void{
    this.subjectPesquisa.next('');
  }

  /*public pesquisa(termoDaPesquisa: string): void{
    this.ofertas = this.ofertasService.pesquisaOfertas(termoDaPesquisa)
    this.ofertas.subscribe(
      ( ofertas: Oferta[] ) => console.log(ofertas),
      (erro: any) => console.log("Erro status", erro.status),
      () => console.log("Fluxo de eventos completo!")
    )
  }*/

}
