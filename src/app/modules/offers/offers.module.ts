import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OfferlistComponent } from './containers';
import { CarInfoComponent } from './components';

const childRoutes: Route[] = [{ path: '', component: OfferlistComponent }];

@NgModule({
    declarations: [OfferlistComponent, CarInfoComponent],
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
