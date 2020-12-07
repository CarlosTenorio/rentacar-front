import { OrderInterface } from './../../models/order.interface';
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

    constructor(private carsService: CarsService, private orderService: OrderService) {}

    ngOnInit() {
        this.carsAvailable$ = this.carsService.carsAvailable$;
        this.loadingCars$ = this.carsService.loadingCars$;
        console.log(this.carsService.getAvailableCars().length);
        if (!this.carsService.getAvailableCars().length) {
            this.carsService.loadAvailableCars();
        }
    }

    saveOrder(car: CarInterface) {
        console.log(car);
        const orderToSave = {
            car: car.id,
            date_start: this.carsService.getSearch().dateStart ? this.carsService.getSearch().dateStart : new Date(),
            date_end: this.carsService.getSearch().dateEnd ? this.carsService.getSearch().dateEnd : new Date()
        } as OrderInterface;
        this.orderService.saveOrder(orderToSave).subscribe((order: OrderInterface) => {
            console.log(order);
        });
    }
}
