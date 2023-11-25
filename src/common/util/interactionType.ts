export class InteractIionType {
  title: string;
  body: string;

  constructor(title: string, body: string) {
    this.title = title;
    this.body = body;
  }

  static getInteraction(type: number, source: string, target: string) {
    switch (type) {
      case 1:
        return new InteractIionType(
          '팔로우',
          `${source}님이 ${target}님을 팔로우 하셨습니다.`,
        );
      case 2:
        return new InteractIionType(
          '찌르기',
          `${source}님이 ${target}님을 찌르셨습니다.`,
        );
      case 3:
        return new InteractIionType(
          '좋아요',
          `${source}님이 ${target}님의 게시물을 좋아합니다.`,
        );
      case 4:
        return new InteractIionType(
          '댓글',
          `${source}님이 ${target}님의 게시물에 댓글을 남겼습니다.`,
        );
    }
  }
}
