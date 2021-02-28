import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { RouterModule } from '@angular/router';
import { FooterComponent, ToolbarComponent } from './components';
import { LocationsService } from '../home/services/locations/locations.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthInterceptorService } from './services/auth-interceptor/auth-interceptor.service';
@NgModule({
    declarations: [ToolbarComponent, FooterComponent],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        MatIconModule,
        RouterModule,
        FlexLayoutModule
    ],
    exports: [ToolbarComponent, FooterComponent, FlexLayoutModule],
    providers: [
        LocationsService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ]
})
export class CoreModule {}
