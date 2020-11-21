import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LocationInterface } from '../../models';
import { LocationsService } from '../../services/locations/locations.service';

@Component({
    selector: 'search-city',
    templateUrl: './search-city.component.html',
    styleUrls: ['./search-city.component.scss']
})
export class SearchCityComponent implements OnChanges, OnInit {
    @Input() locations: LocationInterface[] = [];

    searchForm = new FormControl('', [Validators.required]);
    copyLocations: LocationInterface[] = [];
    locationSearch: string;
    locationSelected: LocationInterface | null = null;

    constructor(private locationsService: LocationsService) {}

    ngOnInit() {
        this.setSearchCustomValidator();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.locationSelected = null;
        if (changes.locations && !this.copyLocations.length) {
            this.copyLocations = [...this.locations];
        }
    }

    displayLocationFn(location: LocationInterface): string {
        return location && location.name ? location.name : '';
    }

    filterLocations(locationName: string | LocationInterface) {
        if (typeof locationName === 'string') {
            const locationsFiltered = this.copyLocations.filter((location: LocationInterface) => {
                return location.name.toLocaleLowerCase().includes(locationName.toLocaleLowerCase());
            });
            this.locationsService.setLocations(locationsFiltered);
        } else {
            this.locationsService.setLocations(this.copyLocations);
        }
    }

    locationSelectedEvent(location: MatAutocompleteSelectedEvent) {
        this.locationSelected = location.option.value as LocationInterface;
    }

    onBlur() {
        this.locationSelected = this.locations ? this.locations[0] : null;
        this.searchForm.markAsPending();
    }

    existsCityValidator(): ValidationErrors {
        console.log(this.locationSelected);
        return this.locationSelected
            ? null
            : {
                  cityNotExists: 'City not exists'
              };
    }

    private setSearchCustomValidator() {
        this.searchForm.setValidators([this.existsCityValidator.bind(this)]);
    }
}
