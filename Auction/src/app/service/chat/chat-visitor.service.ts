import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatVisitorService {
  private _listVisitor: string[]=[''];
  constructor() { }

  listVisitor(): string[] {
    return this._listVisitor;
  }

   setlistVisitor(value: string) {
    this._listVisitor.push(value)
  }
}
