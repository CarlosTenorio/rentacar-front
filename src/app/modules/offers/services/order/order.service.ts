import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderInterface } from '../../models';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private http: HttpClient) {}

    saveOrder(order: OrderInterface): Observable<OrderInterface> {
        return this.http.post<OrderInterface>(`${environment.apiURL}/orders/`, order);
    }
}
