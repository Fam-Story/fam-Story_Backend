import { HttpStatus } from '@nestjs/common';

export class ResponseCode {
  code: number;
  message: string;

  //200
  static readonly USER_LOGIN_SUCCESS = {
    code: HttpStatus.OK,
    message: '유저 로그인 성공',
  };
  static readonly USER_READ_SUCCESS = {
    code: HttpStatus.OK,
    message: '유저 조회 성공',
  };
  static readonly USER_UPDATE_SUCCESS = {
    code: HttpStatus.OK,
    message: '유저 정보 수정 성공',
  };
  static readonly USER_DELETE_SUCCESS = {
    code: HttpStatus.OK,
    message: '유저 삭제 성공',
  };

  //201
  static readonly USER_CREATED_SUCCESS = {
    code: HttpStatus.CREATED,
    message: '유저 생성 성공',
  };
  static readonly FAMILY_CREATED_SUCCESS = {
    code: HttpStatus.CREATED,
    message: '가족 생성 성공',
  };
  static readonly FAMILY_MEMBER_CREATED_SUCCESS = {
    code: HttpStatus.CREATED,
    message: '가족 멤버 생성 성공',
  };

  //403
  static readonly USER_LOGIN_FAIL = {
    code: HttpStatus.UNAUTHORIZED,
    message: '유저 로그인 실패',
  };

  //404
  static readonly USER_NOT_FOUND = {
    code: HttpStatus.NOT_FOUND,
    message: '유저 조회 실패',
  };
}
