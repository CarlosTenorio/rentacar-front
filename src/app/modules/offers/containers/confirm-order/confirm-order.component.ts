import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BrandInterface, CarInterface, ColorEnum, ModelInterface, SearchInterface } from 'src/app/modules/home/models';
import { OrderService } from '../../services/order/order.service';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';
import { CarsService } from 'src/app/modules/home/services/cars/cars.service';
import { FuelTypeEnum, CategoryInterface } from 'src/app/modules/home/models';
import { DialogLoginComponent } from '../../components';

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
        private carService: CarsService,
        private dialog: MatDialog,
        private authService: AuthenticationService
    ) {}

    ngOnInit() {
        this.carToOrder$ = this.orderService.carToOrder$;
        this.searchCars$ = this.carService.searchCars$;
        this.userLogged$ = this.authService.userLogged$;
        this.checkIfUserIsLogged();
        this.addMock();
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
        this.carService.newSearchTrigguered(
            mockSearch.cityId,
            mockSearch.cityName,
            mockSearch.dateStart,
            mockSearch.dateEnd
        );
    }

    private checkIfUserIsLogged() {
        const token = localStorage.getItem('authToken');
        if (token) {
            this.authService.setUserLogged(true);
        }
    }

    openUserLogin() {
        this.dialog.open(DialogLoginComponent);
    }
}
