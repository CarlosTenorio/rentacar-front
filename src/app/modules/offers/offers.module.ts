import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { OfferlistComponent } from './containers';
import { CarInfoComponent } from './components/car-info/car-info.component';

const childRoutes: Route[] = [{ path: '', component: OfferlistComponent }];

@NgModule({
    declarations: [OfferlistComponent, CarInfoComponent],
    imports: [CommonModule, RouterModule.forChild(childRoutes)]
})
export class OffersModule {}
