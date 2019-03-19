import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DatePipe} from "@angular/common";

import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {AuthorizationComponent} from './authorization/authorization.component';
import {LessonsListComponent} from './lessons-list/lessons-list.component';
import {SidebarComponent} from './sidebar/sidebar.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule, MatNativeDateModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        AuthorizationComponent,
        LessonsListComponent,
        SidebarComponent
    ],
    imports: [
        BrowserModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatProgressBarModule,
        MatNativeDateModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [
        MatDatepickerModule,
        DatePipe,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
