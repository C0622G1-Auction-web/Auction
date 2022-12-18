import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../../service/transaction/transaction.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";
import {PageTransaction} from "../../model/transaction/page-transaction";
import {TransactionAuction} from "../../model/transaction/transaction";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  pageTransaction: PageTransaction;
  rfSearch: FormGroup;
  deleteIds: number[];
  deleteTransaction: TransactionAuction[];
  checkedAll: boolean;

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
    this.createSearchForm();
    this.findAll(0);
    this.deleteIds = [];
    this.checkedAll = false;
  }

  /**
   * Created HuyNV
   * Date created 18/12/2022
   * Function: list transaction
   */
  findAll(pageNumber: number) {
    this._transactionService.findAll(this.rfSearch.value, pageNumber).subscribe(
      data => {
        this.pageTransaction = data;
      }
    );
  }

  /**
   * Created HuyNV
   * Date created 16/12/2022
   * Function: search transaction
   */
  createSearchForm() {
    this.rfSearch = this._formBuilder.group({
      userPost: [''],
      userBuying: [''],
      nameProduct: [''],
      currentPrice: [''],
      auctionStatus: ['']
    });
  }

  resetFormAndData() {
    this.ngOnInit();
  }

  gotoPage(pageNumber: number) {
    this.findAll(pageNumber);
  }


  /**
   * Created HuyNV
   * Date created 16/12/2022
   * Function: delete transaction
   */
  addToDelete(id: number) {
    const index = this.deleteIds.indexOf(id, 0);
    index > -1 ? this.deleteIds.splice(index, 1) : this.deleteIds.push(id);
  }

  addAllToDelete() {
    this.checkedAll = true;
    for (let value of this.pageTransaction.content) {
      if (!this.deleteIds.includes(value.id)) {
        this.checkedAll = false;
        break;
      }
    }
    if (this.checkedAll) {
      for (let value of this.pageTransaction.content) {
        const index = this.deleteIds.indexOf(value.id, 0);
        this.deleteIds.splice(index, 1);
      }
    } else {
      for (let value of this.pageTransaction.content) {
        const index = this.deleteIds.indexOf(value.id, 0);
        if (index == -1) {
          this.deleteIds.push(value.id);
        }
      }
    }
  }

  sendToDeleteGroupModal() {
    this.deleteTransaction = [];
    this._transactionService.findByListId(this.deleteIds).subscribe(data => {
      this.deleteTransaction = data;
    }, error => {
      // this._notificationService.showErrorNotification('');
    });
  }


  delete() {
    this._transactionService.deleteByListId(this.deleteIds).subscribe(data => {
      // this._notificationService.showSuccessNotification('Xoá thành công!');
    }, error => {
      // this._notificationService.showErrorNotification('Có lỗi khi xoá');
    }, () => {
      this.ngOnInit();
    });
  }
}
