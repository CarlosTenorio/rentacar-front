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

    constructor(public locationsService: LocationsService, private carsService: CarsService, private router: Router) {}

    ngOnInit() {
        this.loadObservables();
        this.locationsService.loadLocations();
    }

    findCars() {
        if (this.formIsValid()) {
            this.carsService.loadAvailableCars(
                this.locationSelected.id,
                this.locationSelected.name,
                this.pickupDateValue,
                this.returnDateValue
            );
            this.router.navigate(['offerlist']);
        }
    }

    private formIsValid(): boolean {
        // if (this.locationSelected && this.pickupDateValue && this.returnDateValue) {
        //     return true;
        // } else {
        //     return false;
        // }

        // return (
        //     this.locationSelected != null &&
        //     this.locationSelected != undefined &&
        //     this.pickupDateValue != null &&
        //     this.pickupDateValue != undefined &&
        //     this.returnDateValue != null &&
        //     this.returnDateValue != undefined
        // );

        // !! nos permite convertir en un boolean una variable de otro tipo.
        return !!this.locationSelected && !!this.pickupDateValue && !!this.returnDateValue;
    }

    private loadObservables() {
        this.locations$ = this.locationsService.locations$;
    }

    locationChange(location: LocationInterface) {
        this.locationSelected = location;
    }
}
