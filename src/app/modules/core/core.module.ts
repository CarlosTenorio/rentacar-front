import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent, ToolbarComponent } from './components';

@NgModule({
  declarations: [ToolbarComponent, FooterComponent],
  imports: [CommonModule, MatToolbarModule],
  exports: [ToolbarComponent, FooterComponent],
})
export class CoreModule {}
