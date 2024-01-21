class User {
  private id: string;

  private score: number;

  constructor(id: string) {
    this.id = id;
    this.score = 0;
  }

  setScore(score: number): void {
    this.score = score;
  }

  getScore(): number {
    return this.score;
  }

  getId(): string {
    return this.id;
  }
}

export default User;
