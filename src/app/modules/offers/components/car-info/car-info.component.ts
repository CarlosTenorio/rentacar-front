import { Component, Input, OnInit } from '@angular/core';
import { CarInterface } from 'src/app/modules/home/models';

@Component({
    selector: 'app-car-info',
    templateUrl: './car-info.component.html',
    styleUrls: ['./car-info.component.scss']
})
export class CarInfoComponent implements OnInit {
    @Input() car: CarInterface;

    constructor() {}

    ngOnInit(): void {}
}
