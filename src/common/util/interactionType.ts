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
        return new InteractionType('👉Poked!', `${source} poked you!`);
      case 2:
        return new InteractionType('❤️Heart!', `${source} sent heart to you!`);
      case 3:
        return new InteractionType('👎Boo~!', `${source} booed you!`);
      case 4:
        return new InteractionType(
          '👏Complimented!',
          `${source} complimented you!`,
        );
    }
  }
}
