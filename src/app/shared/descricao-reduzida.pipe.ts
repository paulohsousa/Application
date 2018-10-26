import { PipeTransform , Pipe} from '@angular/core'

@Pipe({
    name: 'descricaoReduzida'
})

export class DescricaoReduzida implements PipeTransform{

    transform(texto: string, truncarEm: number): string{
        //metodo length retorna o tamanho da string
        if (texto.length > truncarEm){
            //corta a string considerando uma posição inicial e final
            return texto.substr(0, truncarEm) + '...'
        }     

        return texto
    }

}