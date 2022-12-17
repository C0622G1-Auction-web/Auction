import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../../service/transaction/transaction.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  listTransaction: any;
  rfSearch: FormGroup;

  constructor(private _transactionService: TransactionService,
              private _router: Router,
              private _formBuilder: FormBuilder) {
  }

  /**
   * Created HuyNV
   * Date created 16/12/2022
   * Function: List transaction
   */

  ngOnInit(): void {
    this._transactionService.findAll().subscribe(
      data => {
        console.log(data)
        this.listTransaction = data;
      }
    );
    this.searchForm()
  }

  /**
   * Created HuyNV
   * Date created 16/12/2022
   * Function: search transaction
   */
  searchForm() {
    this.rfSearch = this._formBuilder.group({
      searchUserPost: [''],
      searchUserBuying: [''],
      searchProductName: [''],
      searchCurrentPrice: [0, 0],
      searchPayStatus: ['']
    })
  }

  onSearch() {
    this._transactionService.search(this.rfSearch.value).subscribe(
      data => {
        this.listTransaction = data;
      }
    );
  }
}
