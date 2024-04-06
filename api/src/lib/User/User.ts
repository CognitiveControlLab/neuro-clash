class User {
  private id: string;

  private score: number;

  private ready: boolean;

  constructor(id: string) {
    this.id = id;
    this.score = 0;
    this.ready = false;
  }

  public setScore(score: number): void {
    this.score = score;
  }

  public getScore(): number {
    return this.score;
  }

  public getId(): string {
    return this.id;
  }

  public setReady(ready: boolean): void {
    this.ready = ready;
  }

  public isReady(): boolean {
    return this.ready;
  }
}

export default User;
