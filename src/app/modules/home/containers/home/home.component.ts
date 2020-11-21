import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocationInterface } from '../../models';
import { CarsService } from '../../services/cars/cars.service';
import { LocationsService } from '../../services/locations/locations.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    locations$: Observable<LocationInterface[]>;
    locationSelected: LocationInterface;
    locationSelectedError = false;
    pickupDateValue: Date = new Date();
    returnDateValue: Date = new Date();

    constructor(private locationsService: LocationsService, private carsService: CarsService, private router: Router) {}

    ngOnInit() {
        this.loadObservables();
        this.locationsService.loadLocations();
    }

    private formIsValid(): boolean {
        this.locationSelectedError = !!!this.locationSelected;
        return !this.locationSelectedError && !!this.pickupDateValue && !!this.returnDateValue;
    }

    private loadObservables() {
        this.locations$ = this.locationsService.locations$;
    }

    locationChange(location: LocationInterface) {
        this.locationSelected = location;
    }

    findCars() {
        if (this.formIsValid()) {
            this.carsService.loadAvailableCars(this.pickupDateValue, this.returnDateValue);
            this.router.navigate(['offerlist']);
        }
    }
}
