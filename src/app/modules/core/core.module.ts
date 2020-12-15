import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FooterComponent, ToolbarComponent } from './components';

@NgModule({
    declarations: [ToolbarComponent, FooterComponent],
    imports: [CommonModule, BrowserModule, BrowserAnimationsModule, HttpClientModule, MatToolbarModule, RouterModule],
    exports: [ToolbarComponent, FooterComponent]
})
export class CoreModule {}
