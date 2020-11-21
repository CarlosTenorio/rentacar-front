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
    @Input() locations: LocationInterface[];

    @Output() locationChange = new EventEmitter<string>();

    indexFocused = 0;
    inputFocused = false;
    locationSearch: string | null = null;
    options: LocationInterface[] = [];

    constructor() {}

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        if (this.inputFocused) {
            if (event.keyCode === KEY_CODE.UP_ARROW && this.indexFocused > 0) {
                this.indexFocused--;
            }
            if (event.keyCode === KEY_CODE.DOWN_ARROW && this.indexFocused < this.options.length - 1) {
                this.indexFocused++;
            }
            if (event.keyCode === KEY_CODE.ENTER) {
                this.locationSearch = this.options[this.indexFocused]
                    ? this.options[this.indexFocused].name
                    : this.locationSearch;
                this.locationChange.emit(this.locationSearch);
                this.cleanOptions();
            }
        }
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
            this.options = this.locations.filter((location: LocationInterface) => {
                return location.name.toLocaleLowerCase().includes(this.locationSearch.toLocaleLowerCase());
            });
            if (!this.options.length) {
                this.cleanOptions();
            }
        } else {
            this.cleanOptions();
        }
    }

    selectOption(location: LocationInterface) {
        this.locationSearch = location.name;
        this.locationChange.emit(this.locationSearch);
        this.cleanOptions();
    }
}
