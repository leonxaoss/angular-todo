import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FormCanDeactivateInterface } from '../../interfaces/form-can-deactivate-interface';

@Injectable({
  providedIn: 'root'
})
export class FormCanDeactivateGuard implements CanDeactivate<FormCanDeactivateInterface> {
  canDeactivate(
    component: FormCanDeactivateInterface,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate();
  }
}
