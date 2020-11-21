import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarInterface } from 'src/app/modules/home/models';
import { CarsService } from 'src/app/modules/home/services/cars/cars.service';

@Component({
    selector: 'app-offerlist',
    templateUrl: './offerlist.component.html',
    styleUrls: ['./offerlist.component.scss']
})
export class OfferlistComponent implements OnInit {
    carsAvailable$: Observable<CarInterface[]>;

    constructor(private carsService: CarsService) {}

    ngOnInit() {
        this.carsAvailable$ = this.carsService.carsAvailable$;
    }
}
