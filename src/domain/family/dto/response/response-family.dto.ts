import { Family } from '../../../../infra/entities';

export class ResponseFamilyDto {
  readonly familyId: number;
  readonly memberNumber: number;
  readonly familyName: string;
  readonly createdDate: Date;
  readonly familyKeyCode: string;

  private constructor(
    familyId: number,
    memberNumber: number,
    familyName: string,
    createdDate: Date,
    familyKeyCode: string,
  ) {
    this.familyId = familyId;
    this.memberNumber = memberNumber;
    this.familyName = familyName;
    this.createdDate = createdDate;
    this.familyKeyCode = familyKeyCode;
  }

  static of(
    familyId: number,
    memberNumber: number,
    familyName: string,
    createdDate: Date,
    familyKeyCode: string,
  ): ResponseFamilyDto {
    return new ResponseFamilyDto(
      familyId,
      memberNumber,
      familyName,
      createdDate,
      familyKeyCode,
    );
  }

  static from(family: Family): ResponseFamilyDto {
    return new ResponseFamilyDto(
      family.id,
      family.memberNumber,
      family.familyName,
      family.createdDate,
      family.keyCode,
    );
  }
}
