import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material-module';


import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SidebarService } from './side-bar/side-bar.service';
import { DataWrapperService } from './shared/data-wrapper.service';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { CodeComponent } from './code/code.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    HomeComponent,
    EditComponent,
    CodeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    routing
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DataWrapperService, SidebarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
