import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID} from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
//import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'

import { registerLocaleData } from "@angular/common";//para funcionar moeda com o padrao brasileiro
import localePt from "@angular/common/locales/pt";//para funcionar moeda com o padrao brasileiro
registerLocaleData(localePt);//para funcionar moeda com o padrao brasileiro

import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { HomeComponent } from './home/home.component';
import { RodapeComponent } from './rodape/rodape.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { DiversaoComponent } from './diversao/diversao.component';
import { ROUTES } from './app.routes';
import { OfertaComponent } from './oferta/oferta.component';
import { ComoUsarComponent } from './oferta/como-usar/como-usar.component';
import { OndeFicaComponent } from './oferta/onde-fica/onde-fica.component';
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component';
import { OrdemCompraSucessoComponent } from './ordem-compra-sucesso/ordem-compra-sucesso.component';
import { CarrinhoService } from './carrinho.service'

//pipe
import { DescricaoReduzida } from './shared/descricao-reduzida.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    HomeComponent,
    RodapeComponent,
    RestaurantesComponent,
    DiversaoComponent,
    OfertaComponent,
    ComoUsarComponent,
    OndeFicaComponent,
    DescricaoReduzida,
    OrdemCompraComponent,
    OrdemCompraSucessoComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    //FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ CarrinhoService, { provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
