import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OfferlistComponent, ConfirmOrderComponent } from './containers';
import { CarInfoComponent } from './components';

const childRoutes: Route[] = [
    { path: '', component: OfferlistComponent },
    { path: 'confirm', component: ConfirmOrderComponent }
];

@NgModule({
    declarations: [OfferlistComponent, CarInfoComponent, ConfirmOrderComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(childRoutes),
        FlexLayoutModule,
        MatIconModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        MatSnackBarModule
    ]
})
export class OffersModule {}
