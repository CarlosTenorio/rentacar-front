import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './containers';
import { CoreModule } from '../core/core.module';

const childRoutes: Route[] = [{ path: '', component: HomeComponent }];

@NgModule({
    declarations: [HomeComponent],
    imports: [RouterModule.forChild(childRoutes)]
})
export class HomeModule {}
