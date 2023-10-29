export class ResponsePostDto {
  readonly postId: number;
  readonly familyId: number;
  readonly s3ImageUrl: string;
  readonly name: string;
  readonly createdDate: Date;

  private constructor(
    postId: number,
    familyId: number,
    s3ImageUrl: string,
    name: string,
    createdDate: Date,
  ) {
    this.postId = postId;
    this.familyId = familyId;
    this.s3ImageUrl = s3ImageUrl;
    this.name = name;
    this.createdDate = createdDate;
  }

  static of(
    postId: number,
    familyId: number,
    s3ImageUrl: string,
    name: string,
    createdDate: Date,
  ): ResponsePostDto {
    return new ResponsePostDto(postId, familyId, s3ImageUrl, name, createdDate);
  }
}
