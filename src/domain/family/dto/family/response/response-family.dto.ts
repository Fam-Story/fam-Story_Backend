import { ResponseFamilyScheduleDto } from '../../family-schedule';
import { ResponseFamilyMemberDto } from '../../family-member';
import { ResponsePhotoDto } from '../../photo';

export class ResponseFamilyDto {
  readonly familyId: number;
  readonly memberNumber: number;
  readonly familyName: string;
  readonly createdDate: string;
  readonly familyMembers: ResponseFamilyMemberDto[];
  readonly familySchedules: ResponseFamilyScheduleDto[];
  readonly photos: ResponsePhotoDto[];

  private constructor(
    familyId: number,
    memberNumber: number,
    familyName: string,
    createdDate: string,
    familyMembers: ResponseFamilyMemberDto[],
    familySchedules: ResponseFamilyScheduleDto[],
    photos: ResponsePhotoDto[],
  ) {
    this.familyId = familyId;
    this.memberNumber = memberNumber;
    this.familyName = familyName;
    this.createdDate = createdDate;
    this.familyMembers = familyMembers;
    this.familySchedules = familySchedules;
    this.photos = photos;
  }

  static of(
    familyId: number,
    memberNumber: number,
    familyName: string,
    createdDate: string,
    familyMembers: ResponseFamilyMemberDto[],
    familySchedules: ResponseFamilyScheduleDto[],
    photos: ResponsePhotoDto[],
  ): ResponseFamilyDto {
    return new ResponseFamilyDto(
      familyId,
      memberNumber,
      familyName,
      createdDate,
      familyMembers,
      familySchedules,
      photos,
    );
  }
}
