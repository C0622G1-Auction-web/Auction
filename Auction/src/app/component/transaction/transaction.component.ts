import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../../service/transaction/transaction.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PageTransaction} from "../../model/transaction/page-transaction";
import {TransactionAuction} from "../../model/transaction/transaction";
import {NotificationService} from "../../service/notification/notification.service";
import {Title} from "@angular/platform-browser";

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
              private _formBuilder: FormBuilder,
              private _notificationService: NotificationService,
              private _titleService: Title) {
    this._titleService.setTitle("Quản lý giao dịch")
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
        console.log(data);
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
      userPost: ['', [
        Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{1,50}$"),
        Validators.maxLength(50)
      ]],
      userBuying: ['', [
        Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]{1,50}$"),
        Validators.maxLength(50)
      ]],
      nameProduct: [''],
      currentPrice: ['', [
        Validators.pattern("^[0-9]{0,20}"),
        Validators.maxLength(20)]],
      paymentStatus: ['']
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
      if (value.paymentStatus == 0 && value.deleteStatus == 0) {
        if (!this.deleteIds.includes(value.paymentId)) {
          this.checkedAll = false;
          break;
        }
      }
    }
    if (this.checkedAll) {
      for (let value of this.pageTransaction.content) {
        if (value.paymentStatus == 0 && value.deleteStatus == 0) {
          const index = this.deleteIds.indexOf(value.paymentId, 0);
          this.deleteIds.splice(index, 1);
        }
      }
    } else {
      for (let value of this.pageTransaction.content) {
        if (value.paymentStatus == 0 && value.deleteStatus == 0) {
          const index = this.deleteIds.indexOf(value.paymentId, 0);
          if (index == -1) {
            this.deleteIds.push(value.paymentId);
          }
        }
      }
    }
  }

  sendToDeleteGroupModal() {
    this.deleteTransaction = [];
    this._transactionService.findByListId(this.deleteIds).subscribe(data => {
      this.deleteTransaction = data;
    }, error => {
      this._notificationService.showErrorNotification('Không tìm thấy mã giao dịch');
    });
  }


  delete() {
    this._transactionService.deleteByListId(this.deleteIds).subscribe(data => {
      this._notificationService.showSuccessNotification('Xoá thành công!');
    }, error => {
      this._notificationService.showErrorNotification('Có lỗi khi xoá');
    }, () => {
      this.ngOnInit();
    });
  }
}
