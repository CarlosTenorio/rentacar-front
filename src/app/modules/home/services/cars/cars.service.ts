import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CarInterface, SearchInterface } from '../../models';

@Injectable({
    providedIn: 'root'
})
export class CarsService {
    private carsAvailableSubject: BehaviorSubject<CarInterface[]> = new BehaviorSubject([]);
    private loadingCarsSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private searchCarsSubject: BehaviorSubject<SearchInterface> = new BehaviorSubject(null);
    readonly carsAvailable$: Observable<CarInterface[]> = this.carsAvailableSubject.asObservable();
    readonly loadingCars$: Observable<boolean> = this.loadingCarsSubject.asObservable();
    readonly searchCars$: Observable<SearchInterface> = this.searchCarsSubject.asObservable();

    constructor(private http: HttpClient) {}

    loadAvailableCars(cityId: number, cityName: string, dateStart: Date = null, dateEnd: Date = null) {
        this.loadingCarsSubject.next(true);
        let httpParams;
        if (dateStart && dateEnd) {
            dateStart.setHours(0, 0, 0, 0);
            dateEnd.setHours(0, 0, 0, 0);
            httpParams = new HttpParams()
                .append('date_start', new Date(dateStart).toISOString())
                .append('date_end', new Date(dateEnd).toISOString());
        }

        if (cityId) {
            httpParams = httpParams.append('city', cityId.toString());
        }

        this.newSearchTrigguered(cityId, cityName, dateStart, dateEnd);

        this.http
            .get<CarInterface[]>(`${environment.apiURL}/cars`, { params: httpParams })
            .pipe(
                finalize(() => {
                    this.loadingCarsSubject.next(false);
                })
            )
            .subscribe((cars: CarInterface[]) => {
                this.carsAvailableSubject.next(cars);
            });
    }

    newSearchTrigguered(cityId: number, cityName: string, dateStart: Date, dateEnd: Date) {
        this.searchCarsSubject.next({ cityId, cityName, dateEnd, dateStart } as SearchInterface);
    }

    getAvailableCars(): CarInterface[] {
        return this.carsAvailableSubject.value;
    }

    getSearch(): SearchInterface {
        return this.searchCarsSubject.value;
    }
}
