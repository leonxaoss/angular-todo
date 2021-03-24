import { Pipe, PipeTransform } from '@angular/core';
import { UserInterface } from '../../../interfaces/user-interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(users: any[], groupTypes: string[]): UserInterface[] {
    if (!groupTypes || groupTypes.length === 0) {
      return users;
    }
    return users.filter(user => groupTypes.includes(user.group));
  }
}
