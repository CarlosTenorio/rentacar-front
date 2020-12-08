import { OrderInterface } from './../../models/order.interface';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarInterface } from 'src/app/modules/home/models';
import { CarsService } from 'src/app/modules/home/services/cars/cars.service';
import { OrderService } from '../../services/order/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-offerlist',
    templateUrl: './offerlist.component.html',
    styleUrls: ['./offerlist.component.scss']
})
export class OfferlistComponent implements OnInit {
    carsAvailable$: Observable<CarInterface[]>;
    loadingCars$: Observable<boolean>;

    constructor(private carsService: CarsService, private orderService: OrderService, private snackBar: MatSnackBar) {}

    ngOnInit() {
        this.carsAvailable$ = this.carsService.carsAvailable$;
        this.loadingCars$ = this.carsService.loadingCars$;
        if (!this.carsService.getAvailableCars().length) {
            this.carsService.loadAvailableCars();
        }
    }

    saveOrder(car: CarInterface) {
        const dateStart = this.carsService.getSearch().dateStart ? this.carsService.getSearch().dateStart : new Date();
        const dateEnd = this.carsService.getSearch().dateEnd ? this.carsService.getSearch().dateEnd : new Date();

        dateStart.setHours(0, 0, 0, 0);
        dateEnd.setHours(0, 0, 0, 0);

        const orderToSave = {
            car: car.id,
            date_start: dateStart,
            date_end: dateEnd
        } as OrderInterface;

        this.orderService.saveOrder(orderToSave).subscribe((order: OrderInterface) => {
            this.snackBar.open('Order created', null, {
                duration: 2000
            });
        });
    }
}
