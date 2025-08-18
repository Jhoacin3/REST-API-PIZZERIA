import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigurationStoreComponent } from '../../features/shared/first-configuration-store/configuration.store.component';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<ConfigurationStoreComponent> = (component: ConfigurationStoreComponent) => {
  return component.canDeactivate();
};
