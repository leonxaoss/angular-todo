import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(users: any[], groupTypes: string[]): any[] {
    if (!groupTypes || groupTypes.length === 0) {
      return users;
    }
    return users.filter(user => groupTypes.includes(user.group));
  }
}
