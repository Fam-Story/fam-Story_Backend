import { ResponseCode } from '../api';
import { BaseException } from './base.exeception';

export class InteractionException extends BaseException {
  constructor(responseCode: ResponseCode) {
    super(responseCode);
  }
}
