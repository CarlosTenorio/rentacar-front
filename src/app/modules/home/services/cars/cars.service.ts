import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CarInterface } from '../../models';

@Injectable({
    providedIn: 'root'
})
export class CarsService {
    private carsAvailableSubject: BehaviorSubject<CarInterface[]> = new BehaviorSubject([]);
    readonly carsAvailable$: Observable<CarInterface[]> = this.carsAvailableSubject.asObservable();

    constructor(private http: HttpClient) {}

    loadAvailableCars(city: number, dateStart: Date, dateEnd: Date) {
        let httpParams;
        if (dateStart && dateEnd) {
            httpParams = new HttpParams()
                .append('date_start', new Date(dateStart).toISOString())
                .append('date_end', new Date(dateEnd).toISOString());
        }

        if (city) {
            httpParams = httpParams.append('city', city.toString());
        }

        this.http
            .get<CarInterface[]>(`${environment.api}/cars`, { params: httpParams })
            .pipe(finalize(() => {}))
            .subscribe((cars: CarInterface[]) => {
                this.carsAvailableSubject.next(cars);
            });
    }

    getAvailableCars(): CarInterface[] {
        return this.carsAvailableSubject.value;
    }
}
