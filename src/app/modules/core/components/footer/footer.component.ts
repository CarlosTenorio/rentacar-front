import { LocationsService } from './../../../home/services/locations/locations.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationInterface } from 'src/app/modules/home/models';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    locations$: Observable<LocationInterface[] | null>;

    constructor(private locationsService: LocationsService) {}

    ngOnInit(): void {
        this.locations$ = this.locationsService.locations$;
        this.locationsService.loadLocations();
    }
}
