import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarInterface, SearchInterface } from 'src/app/modules/home/models';
import { OrderService } from '../../services/order/order.service';
import { CarsService } from 'src/app/modules/home/services/cars/cars.service';

@Component({
    selector: 'app-confirm-order',
    templateUrl: './confirm-order.component.html',
    styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {
    carToOrder$: Observable<CarInterface>;
    searchCars$: Observable<SearchInterface>;

    constructor(private orderService: OrderService, private carService: CarsService) {}

    ngOnInit() {
        this.carToOrder$ = this.orderService.carToOrder$;
        this.searchCars$ = this.carService.searchCars$;
    }
}
