import { ColorEnum } from './color.enum';
import { FuelTypeEnum } from './fuel-type.enum';

export interface CarInterface {
    color: ColorEnum;
    doors: number;
    passengers: number;
    fuel_type: FuelTypeEnum;
    category: any;
    model: any;
}
