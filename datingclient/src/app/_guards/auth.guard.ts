import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../_models/user';

export const AuthGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);
  return accountService.currentUser$.pipe(
    map( (user: User | null) => {
      if (user) return true;
      else {
        toastr.error('You shall not pass!');
        return false;
      }
    })
  );
};
