import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { OrdemCompraService } from '../ordem-compra.service';
import { Pedido } from '../shared/pedido.model';
import { CarrinhoService } from '../carrinho.service';
import { ItemCarrinho } from '../shared/item-carrinho.model'

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number
  public itensCarrinho: ItemCarrinho[]
  public totalCarrinho: number

  /**
   * Observações
   * Metodos estáticos não precisam das estancias do objetos ex (Validators)
   * 
   */

  //formGroup representa o formulário na classe do componente
  public formulario: FormGroup = new FormGroup({
    //formControls representa os elementos do formulário(campos)
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),//form control recebe 3 parâmetros
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  })

  constructor(private ordemCompraService: OrdemCompraService, private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens()
  }

  public confirmarCompra(): void{

    //testa de o formulário é invalido e caso for realiza uma função para acionar a comunição com o usuário
    if (this.formulario.status === 'INVALID'){
      this.formulario.get('endereco').markAsTouched()
      this.formulario.get('numero').markAsTouched()
      this.formulario.get('complemento').markAsTouched()
      this.formulario.get('formaPagamento').markAsTouched()
    }else{

      //senão houver itens não deixa enviar o formulário
      //length - função nativa do javascript que que retorna a quantidade de itens do array
      if(this.carrinhoService.exibirItens().length === 0){

        alert('Você não selecionou nenhum item')

      } else{
        //intancia uma classe e popula o objeto com valores inseridos no formulário
        let pedido: Pedido = new Pedido(
          this.formulario.value.endereco,
          this.formulario.value.numero,
          this.formulario.value.complemento,
          this.formulario.value.formaPagamento,
          this.carrinhoService.exibirItens()
        )

        //envia para no servico o objeto pedido
        this.ordemCompraService.efetivarCompra(pedido)
          .subscribe((idPedido: number) => {//efetua o subscribe porque o serviço retorna um Observable
            this.idPedidoCompra = idPedido
            //após a confirmação da compra limpa o carrinho
            this.carrinhoService.limparCarrinho()
          })
      }

      
    }
  }

  //recebe o item relacionado no template do ngfor e adiciona um em sua quantidade
  //metodo que funciona como ponte para o servico de adicionar a quantidade
  public incrementarQuantidade(item: ItemCarrinho): void{
    this.carrinhoService.adicionarQuantidade(item)
  }

  //recebe o item relacionado no template do ngfor e adiciona um em sua quantidade
  //metodo que funciona como ponte para o servico de adicionar a quantidade
  public decrementarQuantidade(item: ItemCarrinho): void{
    this.carrinhoService.decrementarQuantidade(item)
  }
}
