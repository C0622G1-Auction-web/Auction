import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _toastrService: ToastrService) {
  }

  showSuccessNotification(message: string) {
    this._toastrService.success(message, 'Thông Báo', {
      timeOut: 2000,
      progressBar: true,
      positionClass: 'toast-top-right',
      easing: 'ease-in'
    });
  }

  showErrorNotification(message: string) {
    this._toastrService.error(message, 'Lỗi', {
      timeOut: 2000,
      progressBar: true,
      positionClass: 'toast-top-right',
      easing: 'ease-in'
    });
  }

  showWarningNotification(message: string) {
    this._toastrService.warning(message, 'Cảnh báo', {
      timeOut: 2000,
      progressBar: true,
      positionClass: 'toast-top-right',
      easing: 'ease-in'
    });
  }
}
