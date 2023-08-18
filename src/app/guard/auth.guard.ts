import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const currentMenu = route.url[0].path;
  const router=inject(Router);
  const authService=inject(AuthService);

    if (authService.isExistsToken('myToken')) {
      return true;
    } else {
      if (currentMenu=='login'){
        return true;
      }else {
        alert('access denide !');
        router.navigateByUrl('/login');
        return false;
      }
    }
};
