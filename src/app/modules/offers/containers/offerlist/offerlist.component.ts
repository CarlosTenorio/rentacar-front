import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarInterface } from 'src/app/modules/home/models';
import { CarsService } from 'src/app/modules/home/services/cars/cars.service';
import { OrderService } from '../../services/order/order.service';

@Component({
    selector: 'app-offerlist',
    templateUrl: './offerlist.component.html',
    styleUrls: ['./offerlist.component.scss']
})
export class OfferlistComponent implements OnInit {
    carsAvailable$: Observable<CarInterface[]>;
    loadingCars$: Observable<boolean>;

    constructor(private carsService: CarsService, private orderService: OrderService, private router: Router) {}

    ngOnInit() {
        this.carsAvailable$ = this.carsService.carsAvailable$;
        this.loadingCars$ = this.carsService.loadingCars$;
    }

    confirmOrder(car: CarInterface) {
        this.orderService.setCarToOrder(car);
        this.router.navigateByUrl('offerlist/confirm');
    }
}
