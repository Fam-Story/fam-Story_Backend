import { ResponseCode } from '../api';
import { BaseException } from './base.exeception';
export class FamilyException extends BaseException {
  constructor(responseCode: ResponseCode) {
    super(responseCode);
  }
}
