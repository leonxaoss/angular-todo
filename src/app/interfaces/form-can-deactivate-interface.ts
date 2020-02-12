import { Observable } from 'rxjs';

export interface FormCanDeactivateInterface {
  canDeactivate: () => boolean | Observable<boolean>;
}
