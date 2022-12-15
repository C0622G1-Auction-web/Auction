import { Injectable } from '@angular/core';

const TOKEN_KEY = 'Token_key';
const ROLE_KEY = 'Role_key';
const ACCOUNTID_KEY = 'AccountId_key';
const USERNAME_KEY = 'Username_key';
const STATUSLOCK_KEY = 'StatusLock_key';
const DELETESTATUS_KEY = 'DeleteStatus_key'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles = [];

  constructor() { }

  public setTokenLocal(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token)
  }

  public setTokenSession(token: string) {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token)
  }

  public getToken(): string {
    if (localStorage.getItem(TOKEN_KEY) !== null) {
      return <string>localStorage.getItem(TOKEN_KEY);
    } else {
      return <string>sessionStorage.getItem(TOKEN_KEY);
    }
  }

  public setAccountIdLocal(accountId: number) {
    localStorage.removeItem(ACCOUNTID_KEY);
    localStorage.setItem(ACCOUNTID_KEY, String(accountId))
  }

  public setAccountIdSession(accountId: number) {
    sessionStorage.removeItem(ACCOUNTID_KEY);
    sessionStorage.setItem(ACCOUNTID_KEY, String(accountId))
  }

  public getAccountId(): string {
    if (localStorage.getItem(ACCOUNTID_KEY) !== null) {
      return <string>localStorage.getItem(ACCOUNTID_KEY);
    } else {
      return <string>sessionStorage.getItem(ACCOUNTID_KEY);
    }
  }

  public setUsernameLocal(username: string) {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.setItem(USERNAME_KEY, String(username))
  }

  public setUsernameSession(username: string) {
    sessionStorage.removeItem(USERNAME_KEY);
    sessionStorage.setItem(USERNAME_KEY, String(username))
  }

  public getUsername(): string {
    if (localStorage.getItem(USERNAME_KEY) !== null) {
      return <string>localStorage.getItem(USERNAME_KEY);
    } else {
      return <string>sessionStorage.getItem(USERNAME_KEY);
    }
  }

  public setStatusLockLocal(statusLock: boolean) {
    localStorage.removeItem(STATUSLOCK_KEY);
    localStorage.setItem(STATUSLOCK_KEY, String(statusLock))
  }

  public setStatusLockSession(statusLock: boolean) {
    sessionStorage.removeItem(STATUSLOCK_KEY);
    sessionStorage.setItem(STATUSLOCK_KEY, String(statusLock))
  }

  public getStatusLock(): string {
    if (localStorage.getItem(STATUSLOCK_KEY) !== null) {
      return <string>localStorage.getItem(STATUSLOCK_KEY);
    } else {
      return <string>sessionStorage.getItem(STATUSLOCK_KEY);
    }
  }

  public setDeleteStatusLocal(deleteStatus: boolean) {
    localStorage.removeItem(DELETESTATUS_KEY);
    localStorage.setItem(DELETESTATUS_KEY, String(deleteStatus))
  }

  public setDeleteStatusSession(deleteStatus: boolean) {
    sessionStorage.removeItem(DELETESTATUS_KEY);
    sessionStorage.setItem(DELETESTATUS_KEY, String(deleteStatus))
  }

  public getDeleteStatus(): string {
    if (localStorage.getItem(DELETESTATUS_KEY) !== null) {
      return <string>localStorage.getItem(DELETESTATUS_KEY);
    } else {
      return <string>sessionStorage.getItem(DELETESTATUS_KEY);
    }
  }

  public setRoleLocal(roles: String[]) {
    localStorage.removeItem(ROLE_KEY);
    localStorage.setItem(ROLE_KEY, JSON.stringify(roles))
  }

  public setRoleSession(roles: String[]) {
    sessionStorage.removeItem(ROLE_KEY);
    sessionStorage.setItem(ROLE_KEY, JSON.stringify(roles))
  }

  public getRole(): string[] {
    if (localStorage.getItem(ROLE_KEY) !== null) {
      JSON.parse(localStorage.getItem(ROLE_KEY)).forEach(role => {
        this.roles.push(role.authority);
      })
    } else {
      JSON.parse(sessionStorage.getItem(ROLE_KEY)).forEach(role => {
        this.roles.push(role.authority);
      })
    }

    return this.roles;
  }

  public logOut() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }


  public isLogged(): boolean {
    return !(window.sessionStorage.getItem(TOKEN_KEY) == null && window.localStorage.getItem(TOKEN_KEY) == null);
  }

  public rememberMe(accountId: number, deleteStatus: boolean, statusLock: boolean, username: string,
                    token: string, role: string[]) {
    this.logOut();
    this.setAccountIdLocal(accountId);
    this.setDeleteStatusLocal(deleteStatus);
    this.setStatusLockLocal(statusLock);
    this.setUsernameLocal(username);
    this.setTokenLocal(token);
    this.setRoleLocal(role);
  }

}
