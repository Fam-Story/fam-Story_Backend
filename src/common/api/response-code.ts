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
  static readonly FAMILY_READ_SUCCESS = {
    code: HttpStatus.OK,
    message: '가족 조회 성공',
  };
  static readonly FAMILY_UPDATE_SUCCESS = {
    code: HttpStatus.OK,
    message: '가족 정보 수정 성공',
  };
  static readonly FAMILY_DELETE_SUCCESS = {
    code: HttpStatus.OK,
    message: '가족 삭제 성공',
  };
  static readonly FAMILY_MEMBER_READ_SUCCESS = {
    code: HttpStatus.OK,
    message: '가족 구성원 조회 성공',
  };
  static readonly FAMILY_MEMBER_UPDATE_SUCCESS = {
    code: HttpStatus.OK,
    message: '가족 구성원 정보 수정 성공',
  };
  static readonly FAMILY_MEMBER_DELETE_SUCCESS = {
    code: HttpStatus.OK,
    message: '가족 구성원 삭제 성공',
  };
  static readonly INTERACTION_READ_SUCCESS = {
    code: HttpStatus.OK,
    message: '상호작용 조회 성공',
  };

  static readonly FAMILY_SCHEDULE_READ_SUCCESS = {
    code: HttpStatus.OK,
    message: '가족 일정 조회 성공',
  };
  static readonly FAMILY_SCHEDULE_UPDATE_SUCCESS = {
    code: HttpStatus.OK,
    message: '가족 일정 정보 수정 성공',
  };
  static readonly FAMILY_SCHEDULE_DELETE_SUCCESS = {
    code: HttpStatus.OK,
    message: '가족 일정 삭제 성공',
  };
  static readonly PHOTO_READ_SUCCESS = {
    code: HttpStatus.OK,
    message: '사진 조회 성공',
  };
  static readonly PHOTO_UPDATE_SUCCESS = {
    code: HttpStatus.OK,
    message: '사진 정보 수정 성공',
  };
  static readonly PHOTO_DELETE_SUCCESS = {
    code: HttpStatus.OK,
    message: '사진 삭제 성공',
  };
  static readonly POST_READ_SUCCESS = {
    code: HttpStatus.OK,
    message: '게시글 조회 성공',
  };
  static readonly POST_UPDATE_SUCCESS = {
    code: HttpStatus.OK,
    message: '게시글 정보 수정 성공',
  };
  static readonly POST_DELETE_SUCCESS = {
    code: HttpStatus.OK,
    message: '게시글 삭제 성공',
  };
  static readonly CHAT_READ_SUCCESS = {
    code: HttpStatus.OK,
    message: '채팅 조회 성공',
  };
  static readonly CHAT_DELETE_SUCCESS = {
    code: HttpStatus.OK,
    message: '채팅 삭제 성공',
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
  static readonly INTERACTION_CREATED_SUCCESS = {
    code: HttpStatus.CREATED,
    message: '상호작용 생성 성공',
  };
  static readonly INTERACTION_DELETED_SUCCESS = {
    code: HttpStatus.OK,
    message: '상호작용 삭제 성공',
  };
  static readonly FAMILY_SCHEDULE_CREATED_SUCCESS = {
    code: HttpStatus.CREATED,
    message: '가족 일정 생성 성공',
  };
  static readonly PHOTO_CREATED_SUCCESS = {
    code: HttpStatus.CREATED,
    message: '사진 생성 성공',
  };
  static readonly POST_CREATED_SUCCESS = {
    code: HttpStatus.CREATED,
    message: '게시글 생성 성공',
  };

  //401
  static readonly USER_LOGIN_FAIL = {
    code: HttpStatus.UNAUTHORIZED,
    message: '유저 로그인 실패',
  };

  //403
  static readonly USER_FORBIDDEN = {
    code: HttpStatus.FORBIDDEN,
    message: '다른 유저의 정보를 조회할 수 없습니다.',
  };

  static readonly FAMILY_FORBIDDEN = {
    code: HttpStatus.FORBIDDEN,
    message: '다른 가족의 정보를 조회할 수 없습니다.',
  };

  static readonly CHAT_FORBIDDEN = {
    code: HttpStatus.FORBIDDEN,
    message: '다른 가족 채팅방의 정보를 조회할 수 없습니다.',
  };

  //404
  static readonly USER_NOT_FOUND = {
    code: HttpStatus.NOT_FOUND,
    message: '유저 조회 실패',
  };

  static readonly FAMILY_NOT_FOUND = {
    code: HttpStatus.NOT_FOUND,
    message: '가족 조회 실패',
  };

  static readonly FAMILY_MEMBER_NOT_FOUND = {
    code: HttpStatus.NOT_FOUND,
    message: '가족 구성원 조회 실패',
  };

  static readonly INTERACTION_NOT_FOUND = {
    code: HttpStatus.NOT_FOUND,
    message: '상호작용 조회 실패',
  };

  static readonly FAMILY_SCHEDULE_NOT_FOUND = {
    code: HttpStatus.NOT_FOUND,
    message: '가족 일정 조회 실패',
  };

  static readonly PHOTO_NOT_FOUND = {
    code: HttpStatus.NOT_FOUND,
    message: '사진 조회 실패',
  };

  static readonly POST_NOT_FOUND = {
    code: HttpStatus.NOT_FOUND,
    message: '게시글 조회 실패',
  };
  static readonly CHAT_NOT_FOUND = {
    code: HttpStatus.NOT_FOUND,
    message: '채팅 조회 실패',
  };

  //409
  static readonly USER_ALREADY_EXIST = {
    code: HttpStatus.CONFLICT,
    message: '유저 중복 생성',
  };
  static readonly FAMILY_MEMBER_ALREADY_EXIST = {
    code: HttpStatus.CONFLICT,
    message: '가족 구성원 중복 생성',
  };
  static readonly FAMILY_CODE_ALREADY_EXIST = {
    code: HttpStatus.CONFLICT,
    message: '가족 코드 중복 생성',
  };

  //500
  static readonly INTERACTION_SEND_FAIL = {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: '상호작용 전송 실패',
  };
}
