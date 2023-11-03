export class ApiHeader {
  code: number;
  success: boolean;

  constructor(code: number, success: boolean) {
    this.code = code;
    this.success = success;
  }
}
