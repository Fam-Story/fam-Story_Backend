export class InteractionType {
  title: string;
  body: string;

  constructor(title: string, body: string) {
    this.title = title;
    this.body = body;
  }

  static getInteraction(type: number, source: string, target: string) {
    switch (type) {
      case 1:
        return new InteractionType(
          '콕콕!',
          `${source}님이 ${target}님을 찔렀어요.`,
        );
      case 2:
        return new InteractionType(
          '하트!',
          `${source}님이 ${target}님에게 하트를 보냈어요.`,
        );
      case 3:
        return new InteractionType(
          '우우우~!',
          `${source}님이 ${target}에게 야유를 보냈어요.`,
        );
      case 4:
        return new InteractionType(
          '칭찬해요!',
          `${source}님이 ${target}님을 칭찬해요.`,
        );
    }
  }
}
