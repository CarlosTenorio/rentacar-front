import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { LocationInterface } from '../../models';

export enum KEY_CODE {
    ENTER = 13,
    UP_ARROW = 38,
    DOWN_ARROW = 40
}

@Component({
    selector: 'select-city',
    templateUrl: './select-city.component.html',
    styleUrls: ['./select-city.component.scss']
})
export class SelectCityComponent {
    @Input() locations: LocationInterface[] | null = [];

    @Output() locationChange: EventEmitter<LocationInterface> = new EventEmitter<LocationInterface>();

    indexFocused = 0;
    inputFocused = false;
    locationSearch: string | null = null;
    locationSelected: LocationInterface;
    options: LocationInterface[] = [];

    constructor() {}

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        // if (this.inputFocused) {
        if (event.keyCode === KEY_CODE.UP_ARROW && this.indexFocused > 0) {
            // Opción clásica para decrementar una unidad
            // this.indexFocused = this.indexFocused - 1;
            // Opción ninja de Javascript
            this.indexFocused--;
        }
        if (event.keyCode === KEY_CODE.DOWN_ARROW && this.indexFocused < this.options.length - 1) {
            // Opción clásica para aumentar una unidad
            // this.indexFocused = this.indexFocused + 1;
            // Opción ninja de Javascript
            this.indexFocused++;
        }
        if (event.keyCode === KEY_CODE.ENTER) {
            this.locationSelected = this.options[this.indexFocused];
            // this.locationSelected = this.options[this.indexFocused]
            //     ? this.options[this.indexFocused]
            //     : this.locationSelected;
            this.locationSearch = this.locationSelected.name;
            this.locationChange.emit(this.locationSelected);
            this.cleanOptions();
        }
        // }
    }

    private cleanOptions() {
        this.options = [];
        this.indexFocused = 0;
    }

    focusOption(index: number) {
        this.indexFocused = index;
    }

    keyDownInput(event: KeyboardEvent) {
        if (event.keyCode === KEY_CODE.DOWN_ARROW || event.keyCode === KEY_CODE.UP_ARROW) {
            event.preventDefault();
        }
    }

    onBlurInput() {
        this.inputFocused = false;
    }

    onFocusInput() {
        this.inputFocused = true;
    }

    searchChange() {
        if (this.locationSearch) {
            // Si tiene valor diferente a null entra, igual a if(this.locations !== null)
            if (this.locations) {
                this.options = this.locations.filter((location: LocationInterface) => {
                    // console.log(location.name.toLocaleLowerCase());
                    return location.name.toLocaleLowerCase().includes(this.locationSearch.toLocaleLowerCase());
                });
                console.log(this.options);
            }
        } else {
            this.cleanOptions();
        }

        ////////////////////////////////////////////////

        // if (this.locationSearch) {
        //     this.options = this.locations.filter((location: LocationInterface) => {
        //         return location.name.toLocaleLowerCase().includes(this.locationSearch.toLocaleLowerCase());
        //     });
        //     if (!this.options.length) {
        //         this.cleanOptions();
        //     }
        // } else {
        //     this.cleanOptions();
        // }
    }

    selectOption(location: LocationInterface) {
        console.log(location);
        this.locationSearch = location.name;
        this.locationSelected = location;
        this.locationChange.emit(location);
        this.cleanOptions();
    }
}
