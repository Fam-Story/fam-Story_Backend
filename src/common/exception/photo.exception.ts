import { ResponseCode } from '../api';
import { BaseException } from './base.exeception';

export class PhotoException extends BaseException {
  constructor(responseCode: ResponseCode) {
    super(responseCode);
  }
}
