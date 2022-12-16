import {Component, OnInit} from '@angular/core';
import {TransactionAuction} from '../../model/transaction/transaction';
import {TransactionService} from '../../service/transaction/transaction.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  listTransaction: TransactionAuction[] | undefined;

  constructor(private _transactionService: TransactionService, private _router: Router) {
  }

  ngOnInit(): void {
    this._transactionService.findAll().subscribe(
      data => {
        this.listTransaction = data;
      }
    );
  }

}
