import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CarInterface } from 'src/app/modules/home/models';
import { environment } from 'src/environments/environment';
import { OrderInterface } from '../../models';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private carToOrderSubject: BehaviorSubject<CarInterface> = new BehaviorSubject(null);
    readonly carToOrder$: Observable<CarInterface> = this.carToOrderSubject.asObservable();

    constructor(private http: HttpClient) {}

    saveOrder(order: OrderInterface): Observable<OrderInterface> {
        return this.http.post<OrderInterface>(`${environment.apiURL}/orders/`, order);
    }

    setCarToOrder(car: CarInterface) {
        this.carToOrderSubject.next(car);
    }
}
