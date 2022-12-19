/*Create by UyenNC
Model password reset token used for account verification
Create Date: 16/12/2022
*/
export interface PasswordResetToken {
  id?: number;
  expiryDate: string;
  status?: boolean;
  token?: string;
  account?: Account;
}
