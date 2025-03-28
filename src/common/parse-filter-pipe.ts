import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {FilterOptions} from "./interfaces";

@Injectable()
export class ParseFilterPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        let [property, operator, propertyValue] = ['', '', ''];
        if(value.trim() != "") {
            [property, operator, propertyValue] = value.split(':');
        }
        return {
            value: propertyValue,
            property: property,
            operator: operator
        } as FilterOptions;
    }
}