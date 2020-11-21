import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocationInterface } from '../../models/location.interface';

@Injectable()
export class LocationsService {
    private locationsSubject: BehaviorSubject<LocationInterface[]> = new BehaviorSubject([]);
    readonly locations$: Observable<LocationInterface[]> = this.locationsSubject.asObservable();

    constructor(private http: HttpClient) {}

    loadLocations() {
        this.http
            .get<LocationInterface[]>(`${environment.api}/locations`)
            .pipe(finalize(() => {}))
            .subscribe((locations: LocationInterface[]) => {
                this.locationsSubject.next(locations);
            });
    }

    getLocations(): LocationInterface[] {
        return this.locationsSubject.value;
    }

    setLocations(locations: LocationInterface[]) {
        this.locationsSubject.next(locations);
    }
}
