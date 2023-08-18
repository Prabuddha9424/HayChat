import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService:CookieService) { }
  public createToken(data:string){
    this.cookieService.set('myToken', data);
  }
  public deleteToken(data:string){
    this.cookieService.delete(data);
  }
  public isExistsToken(key:string):boolean{
    return this.cookieService.check(key);
  }
  public getToken(key:string):string{
    if(this.isExistsToken(key)){
      return this.cookieService.get(key);
    }
    return '';
  }
}
