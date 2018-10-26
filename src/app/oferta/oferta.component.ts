import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CarrinhoService } from '../carrinho.service'

import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta

  constructor( 
    private route: ActivatedRoute, 
    private ofertasService: OfertasService, 
    private carrinhoService: CarrinhoService 
  ) { }

  ngOnInit() {
    
    //subscribe assiste as alterações feitas na rota
    this.route.params.subscribe((parametros: Params) => {
      this.ofertasService.getOfertaPorId(parametros.id)
        .then((oferta: Oferta) => {
          this.oferta = oferta
      })
    })
  
    
  }

  ngOnDestroy(){}

  //metodo que adiciona o item ao carrinho
  public adicionarItemCarrinho(): void{
    this.carrinhoService.incluirItem(this.oferta)
  }
}
