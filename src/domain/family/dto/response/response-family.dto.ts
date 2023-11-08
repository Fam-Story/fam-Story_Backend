import { Family } from '../../../../infra/entities';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseFamilyDto {
  @ApiProperty({ example: 1 })
  readonly familyId: number;
  @ApiProperty({ example: 4 })
  readonly memberNumber: number;
  @ApiProperty({ example: '푸앙이네 가족' })
  readonly familyName: string;
  @ApiProperty({ example: '2021-08-01T00:00:00.000Z' })
  readonly createdDate: Date;
  @ApiProperty({ example: '12345' })
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
