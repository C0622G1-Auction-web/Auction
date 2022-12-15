
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../model/user/user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../model/user/user";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private httpClient: HttpClient) { }

  getAllUser(): Observable<User[]> {
    return null;
  constructor(private httpClient: HttpClient) {
  }

  findUserById(userId: number): Observable<User> {
    return this.httpClient.get<User>(environment.userUrl + userId)
  }
}
