import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { OfferlistComponent, ConfirmOrderComponent } from './containers';
import { CarInfoComponent } from './components';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { DialogLoginComponent } from './components/dialog-login/dialog-login.component';

const childRoutes: Route[] = [
    { path: '', component: OfferlistComponent },
    { path: 'confirm', component: ConfirmOrderComponent }
];

@NgModule({
    declarations: [OfferlistComponent, CarInfoComponent, ConfirmOrderComponent, DialogLoginComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(childRoutes),
        FlexLayoutModule,
        FormsModule,
        MatIconModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule
    ]
})
export class OffersModule {}
