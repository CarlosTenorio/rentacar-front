import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocationInterface } from '../../models/location.interface';

@Injectable()
export class LocationsService {
    private locationsSubject: BehaviorSubject<LocationInterface[] | null> = new BehaviorSubject(
        [] as LocationInterface[] | null
    );
    readonly locations$: Observable<LocationInterface[] | null> = this.locationsSubject.asObservable();

    constructor(private http: HttpClient) {}

    createLocationsMock() {
        const locationsMock: LocationInterface[] = [
            { id: 0, name: 'Palma' },
            { id: 1, name: 'Madrid' },
            { id: 2, name: 'Pamplona' }
        ];
        this.locationsSubject.next(locationsMock);
    }

    loadLocations() {
        this.http.get<LocationInterface[]>('http://localhost:8000/api/locations/').subscribe(
            (locations: LocationInterface[]) => {
                // cuando va bien la llamada
                console.log(locations);
                this.locationsSubject.next(locations);
            },
            () => {
                // cuando hay error
                this.createLocationsMock();
            }
        );

        // this.http
        //     .get<LocationInterface[]>(`${environment.apiURL}/locations`)
        //     .pipe(finalize(() => {}))
        //     .subscribe((locations: LocationInterface[]) => {
        //         this.locationsSubject.next(locations);
        //     });
    }

    getLocations(): LocationInterface[] {
        return this.locationsSubject.value;
    }

    setLocations(locations: LocationInterface[]) {
        this.locationsSubject.next(locations);
    }
}
