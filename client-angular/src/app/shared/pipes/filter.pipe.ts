import { Pipe, PipeTransform } from '@angular/core';

/**
 * filter : { NAME1: INPUT_NAME, NAME2: INPUT_NAME, .... } : boolean
 * filter: Pipe name
 * NAME: Property name to filter
 * INPUT_NAME: Input field name
 * boolean if true: Match all properties
 * boolean if false: Match one of the properties
 * e.g. *ngFor="let m of movies | filter : { genres: search, title: search } : false"
 */
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any, searchText: any, isAnd: boolean): any {
        if (Array.isArray(items) && searchText) {
            const filterKeys = Object.keys(searchText);
            if (isAnd) {
                return items.filter(item =>
                    filterKeys.reduce((memo, keyName) =>
                        (memo && new RegExp(searchText[keyName], 'gi').test(item[keyName])) || searchText[keyName] === '', true));
            } else {
                return items.filter(item => {
                    return filterKeys.some((keyName) => {
                        return new RegExp(searchText[keyName], 'gi').test(item[keyName]) || searchText[keyName] === '';
                    });
                });
            }
        } else {
            return items;
        }
    }
}
