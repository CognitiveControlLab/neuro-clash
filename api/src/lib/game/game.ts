import DB from '../db';
import User from '../User';

class Game {
  public static readonly MAX_PLAYERS = 2;

  private id: string;

  private players: Map<string, User>;

  private spectators: Map<string, User>;

  private status: 'waiting' | 'started' | 'finished';

  constructor(id: string) {
    this.id = id;
    this.players = new Map<string, User>();
    this.spectators = new Map<string, User>();
    this.status = 'waiting';
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
    if (this.getPlayerCount() >= Game.MAX_PLAYERS && !this.spectators.has(userId)) {
      this.spectators.set(userId, new User(userId));
    } else if (!this.players.has(userId)) {
      this.players.set(userId, new User(userId));
    }
  }

  toggleReady(userId: string) {
    // User not in game
    if (!this.players.has(userId)) {
      return;
    }

    // Game already started or finished
    if (this.status !== 'waiting') {
      return;
    }

    const player = this.players.get(userId);

    player?.setReady(!player.isReady());

    // Update game status
    if (this.isFull() && this.getUsersArray().every((user) => user.ready)) {
      this.status = 'started';
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

  isFull(): boolean {
    return this.getPlayerCount() >= Game.MAX_PLAYERS;
  }

  getUsersArray(): Array<{ id: string, ready: boolean }> {
    return Array.from(this.players, ([key, value]) => ({ id: key, ready: value.isReady() }));
  }

  getStatus(): 'waiting' | 'started' | 'finished' {
    return this.status;
  }
}

export default Game;
