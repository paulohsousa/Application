import { ItemCarrinho } from './shared/item-carrinho.model'
import { Oferta } from './shared/oferta.model'

export class CarrinhoService{

    //definindo o atributo da classe de acordo com um modelo de dados 
    public itens: ItemCarrinho[] = []

    public exibirItens(): ItemCarrinho[]{
        return this.itens
    }

    //metodo que inclui item ao carrinho
    public incluirItem(oferta: Oferta): void{
        //cria um objeto do tipo ItemCarrinho e popula esse objeto com os dados pedidos pelo construtor
       let itemCarrinho: ItemCarrinho = new ItemCarrinho(
           oferta.id,
           oferta.imagens[0],
           oferta.titulo,
           oferta.descricao_oferta,
           oferta.valor,
           1
       )

       //verificar se o item em questão já não existe em this.itens
       //se existe retorna uma referencia para o itemCarrinhoEncontrado
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)

        if (itemCarrinhoEncontrado){
            itemCarrinhoEncontrado.quantidade = itemCarrinhoEncontrado.quantidade + 1
        } else{
            //push - função nativa do javascript que adiciona um item no final do array
            this.itens.push(itemCarrinho)
        }
    }

    //metodo que calcula o valor total do carrinho
    public totalCarrinhoCompras(): number{
        
        let total: number = 0
        
        //map - função nativa do javascript que recebe uma função de callback retorna cada item contidos no array
        this.itens.map((item: ItemCarrinho) => {
            total = total + (item.valor * item.quantidade)
        })

        return total
    }

    //recupera o item passado por parametro e incrementa sua quantidade em +1
    public adicionarQuantidade(item: ItemCarrinho): void{
        item.quantidade = item.quantidade + 1
    }

    //recupera o item passado por parametro e decrementa sua quantidade em +1
    public decrementarQuantidade(item: ItemCarrinho): void{
        item.quantidade = item.quantidade - 1

        if (item.quantidade === 0){
            //splice - função nativa do javascript que com base em um indice, recortar o indice e o devolve para uma variavel 
            //indexOf - devolve a posição em que o parametro passado está
            let oferta = this.itens.splice(this.itens.indexOf(item), 1)//recebe dois argumentos - indice e quantos vao ser removidos
        }
    }

    //limpar carrinho
    public limparCarrinho(): void{
        this.itens = []
    }

}