import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TimesComponent } from './times/times.component';
import { TimeService } from './services/time.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TimesComponent
  ],
  imports: [
    BrowserModule,
    SweetAlert2Module.forRoot({
        buttonsStyling: false,
        customClass: 'modal-content',
        confirmButtonClass: 'btn btn-primary',
        cancelButtonClass: 'btn'
    }),
    HttpModule
  ],
  providers: [ TimeService ],
  bootstrap: [HeaderComponent, TimesComponent, AppComponent, FooterComponent]
})
export class AppModule { }
