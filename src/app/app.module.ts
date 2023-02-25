import { RichiestaService } from './core/_api/services/richiesta.service';
import { CustomerService } from './core/_api/services/customer.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { FilmService } from './core/_api/services/film.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ApiConfiguration } from './core/_api/api-configuration';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { registerLocaleData } from '@angular/common';
import localeITCA from '@angular/common/locales/it';
import { SerieService } from './core/_api/services/serie.service';
import { SliderModule } from 'primeng/slider';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { SpinnerModule } from 'primeng/spinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { ChipsModule } from 'primeng/chips';
import { CarouselModule } from 'primeng/carousel';
import { StagioneService } from './core/_api/services/stagione.service';
import { InputMaskModule } from 'primeng/inputmask';
import { CustomerProfileComponent } from './pages/customer-profile/customer-profile.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { VotoService } from './core/_api/services/voto.service';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { FileUploadModule } from 'primeng/fileupload';
import { PickListModule } from 'primeng/picklist';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { LayoutsComponent } from './pages/layouts/admin/layouts.component';
import { AuthGuard } from './core/guards/auth-guard.service';
import { RoleGuard } from './core/guards/role-guard.service';
import { ApplicationService } from './core/_service/application.service';
import { AuthService } from './core/_service/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomerRegistrationComponent } from './pages/customer-registration/customer-registration.component';
import { CustomerSettingComponent } from './pages/customer-setting/customer-setting.component';
import { CustomersListaComponent } from './pages/customers-lista/customers-lista.component';
import { DettaglioFilmComponent } from './pages/dettaglio-film/dettaglio-film.component';
import { DettaglioSerieTvComponent } from './pages/dettaglio-serie-tv/dettaglio-serie-tv.component';
import { GestioneFilmComponent } from './pages/gestione-film/gestione-film.component';
import { GestioneSerieTvComponent } from './pages/gestione-serie-tv/gestione-serie-tv.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RicercaFilmComponent } from './pages/ricerca-film/ricerca-film.component';
import { RicercaSerieTvComponent } from './pages/ricerca-serie-tv/ricerca-serie-tv.component';
import { RichiesteListComponent } from './pages/richieste-list/richieste-list.component';
import { RichiesteUtenteComponent } from './pages/richieste-utente/richieste-utente.component';
import { StatisticheComponent } from './pages/statistiche/statistiche.component';
import { HomeFilmCardComponent } from './shared/home-film-card/home-film-card.component';
import { HomeCarouselComponent } from './shared/home-carousel/home-carousel.component';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

registerLocaleData(localeITCA);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RicercaFilmComponent,
    DettaglioFilmComponent,
    StatisticheComponent,
    CustomersListaComponent,
    RichiesteListComponent,
    LoginComponent,
    RicercaSerieTvComponent,
    GestioneFilmComponent,
    GestioneSerieTvComponent,
    RichiesteUtenteComponent,
    DettaglioSerieTvComponent,
    CustomerSettingComponent,
    CustomerProfileComponent,
    CustomerRegistrationComponent,
    LayoutsComponent,
    HomeFilmCardComponent,
    HomeCarouselComponent
  ],
  imports: [
    BlockUIModule,
    ProgressSpinnerModule,
    PickListModule,
    FileUploadModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ToggleButtonModule,
    RatingModule,
    ProgressBarModule,
    InputMaskModule,
    CarouselModule,
    ChipsModule,
    PanelModule,
    DataViewModule,
    InputTextareaModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    ToastModule,
    SpinnerModule,
    CardModule,
    ChartModule,
    SliderModule,
    ListboxModule,
    DropdownModule,
    DialogModule,
    MenubarModule,
    MultiSelectModule,
    BrowserModule,
    ButtonModule,
    routing,
    TableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    CommonModule,
    PanelMenuModule,
    FormsModule,
    SplitButtonModule,
    FontAwesomeModule,
    CalendarModule,
    RadioButtonModule,
    InputNumberModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
    })
  ],
  providers: [
    FormBuilder,
    VotoService,
    StagioneService,
    ApplicationService,
    ConfirmationService,
    MessageService,
    RichiestaService,
    SerieService,
    FilmService,
    CustomerService,
    ApiConfiguration,
    AuthService,
    AuthGuard,
    RoleGuard,
    TranslateService,
    TranslateStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
