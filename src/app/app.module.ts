import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


// Esto en necesario para las animaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatRangeDateSelectionModel} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatPseudoCheckboxModule } from '@angular/material/core';
import { LOCALE_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
    // se agregara "innerHTMLTemplatesEnabled: true" para usar ventanas emergentes con HTML Y CSS
    , IonicModule.forRoot({innerHTMLTemplatesEnabled: true})
    , AppRoutingModule
    , BrowserAnimationsModule
    , MatDatepickerModule
    ,MatInputModule
    ,MatNativeDateModule
    ,MatButtonModule
    ,MatFormFieldModule
    ,MatPseudoCheckboxModule
    
  ],
  providers: [
    { provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy 
    }
    , provideAnimationsAsync()
    // para usar el calendario de anfular material debe agregar el soporte de idioma español
    ,{
      provide : LOCALE_ID,
      useValue: 'es-CL'
    }
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
