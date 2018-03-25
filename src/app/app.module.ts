import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InputTextModule, ButtonModule, GMapModule } from 'primeng/primeng';
import { AppComponent } from './app.component';
import { LoginService } from './services/login.service';
import { StationService } from './services/station.service';
import { API_URL, API_URL_MAP, MAP_KEY, API_URL_NSI } from './services/api.service';
import { MapService } from './services/map.service';
import { RouteService } from './services/route.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    InputTextModule, 
    ButtonModule,
    GMapModule
  ],
  providers: [LoginService, StationService, RouteService, 
              { provide: API_URL, useValue : 'http://gcsapod:8080/sapodbridge/' }, 
              { provide: API_URL_MAP, useValue : 'https://maps.googleapis.com/maps/api/geocode/json?address='},
              { provide: MAP_KEY, useValue : 'AIzaSyDCe2FhXDj-IPpRsuHhtG40lP1AHAE52kc'},
              { provide: API_URL_NSI, useValue : '/scripts/'}, MapService
            ],
  bootstrap: [AppComponent]
})

export class AppModule { 
 
}
