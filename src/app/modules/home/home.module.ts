import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { HomeComponent } from './containers';
import { LocationsService } from './services/locations/locations.service';
import { SearchCityComponent, SelectCityComponent } from './components/';

const childRoutes: Route[] = [{ path: '', component: HomeComponent }];

@NgModule({
    declarations: [HomeComponent, SearchCityComponent, SelectCityComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(childRoutes),
        MatAutocompleteModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule
    ],
    providers: [LocationsService, MatDatepickerModule]
})
export class HomeModule {}
