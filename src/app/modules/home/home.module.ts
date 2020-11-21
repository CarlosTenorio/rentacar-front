import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './containers';
import { LocationsService } from './services/locations/locations.service';
import { SearchCityComponent } from './components/';
import { SelectCityComponent } from './components/select-city/select-city.component';
import { MatNativeDateModule } from '@angular/material/core';

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
        MatNativeDateModule
    ],
    providers: [LocationsService, MatDatepickerModule]
})
export class HomeModule {}
