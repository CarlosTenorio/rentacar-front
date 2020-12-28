import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BrandInterface, CarInterface, ColorEnum, ModelInterface, SearchInterface } from 'src/app/modules/home/models';
import { OrderService } from '../../services/order/order.service';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';
import { CarsService } from 'src/app/modules/home/services/cars/cars.service';
import { FuelTypeEnum, CategoryInterface } from 'src/app/modules/home/models';
import { DialogLoginComponent } from '../../components';
import { OrderInterface } from '../../models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'app-confirm-order',
    templateUrl: './confirm-order.component.html',
    styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {
    carToOrder$: Observable<CarInterface>;
    searchCars$: Observable<SearchInterface>;
    userLogged$: Observable<boolean>;

    constructor(
        private orderService: OrderService,
        private carsService: CarsService,
        private dialog: MatDialog,
        private authService: AuthenticationService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    ngOnInit() {
        this.carToOrder$ = this.orderService.carToOrder$;
        this.searchCars$ = this.carsService.searchCars$;
        this.userLogged$ = this.authService.userLogged$;
        // this.addMock();
    }

    private addMock() {
        const mockCar = {
            color: ColorEnum.BLACK,
            doors: 5,
            passengers: 4,
            fuel_type: FuelTypeEnum.GASOLINE,
            category: { name: 'LOW', price: 25 } as CategoryInterface,
            model: {
                brand: { name: 'Citroen' } as BrandInterface,
                photo: '',
                name: 'C1'
            } as ModelInterface
        } as CarInterface;

        const mockSearch = {
            cityId: 0,
            cityName: 'Palma',
            dateEnd: new Date(),
            dateStart: new Date()
        } as SearchInterface;
        this.orderService.setCarToOrder(mockCar);
        this.carsService.newSearchTrigguered(
            mockSearch.cityId,
            mockSearch.cityName,
            mockSearch.dateStart,
            mockSearch.dateEnd
        );
    }

    saveOrder() {
        const dateStart = this.carsService.getSearch().dateStart ? this.carsService.getSearch().dateStart : new Date();
        const dateEnd = this.carsService.getSearch().dateEnd ? this.carsService.getSearch().dateEnd : new Date();
        const car = this.orderService.getCarToOrder();

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
            this.router.navigateByUrl('home');
        });
    }

    openUserLogin() {
        this.dialog.open(DialogLoginComponent);
    }
}
