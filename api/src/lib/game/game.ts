import DB from '../db';
import User from '../User';

class Game {
  private id: string;

  private players: Map<string, User>;

  private spectators: Map<string, User>;

  constructor(id: string) {
    this.id = id;
    this.players = new Map<string, User>();
    this.spectators = new Map<string, User>();
  }

  getId(): string {
    return this.id;
  }

  getPlayerCount(): number {
    return this.players.size;
  }

  getSpectatorCount(): number {
    return this.spectators.size;
  }

  static getOrCreate(gameId : string): Game {
    const game = DB.getGame(gameId);

    if (!game) {
      const newGame = new Game(gameId);
      DB.setGame(newGame);
      return newGame;
    }

    return game;
  }

  join(userId: string): void {
    if (this.getPlayerCount() >= 2 && !this.spectators.has(userId)) {
      this.spectators.set(userId, new User(userId));
    } else if (!this.players.has(userId)) {
      this.players.set(userId, new User(userId));
    }
  }

  progress(userId: string, inputs: any): void {
    if (this.players.has(userId) && inputs.data?.samples?.length && inputs.type === 'accelerometer') {
      this.setCurrentScore(userId, inputs.data.samples[0]);
    }
  }

  setCurrentScore(userId: string, score: number): void {
    if (this.players.has(userId)) {
      this.players.get(userId)?.setScore(score);
    }
  }

  getScores(): Array<{ userId: string, score: number }> {
    return Array.from(this.players, ([key, value]) => ({ userId: key, score: value.getScore() }));
  }
}

export default Game;
