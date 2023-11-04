import { ResponseCode } from '../api';
import { BaseException } from './base.exeception';

export class UserException extends BaseException {
  constructor(responseCode: ResponseCode) {
    super(responseCode);
  }
}
