import { GAME_CYCLE, MAX_PLAYERS } from '../../dictionary/game';
import DB from '../db';
import { User } from '../user';
import type { UserState, Vector } from '../user/user-controller';

export enum GameStatus {
  WAITING = 'waiting',
  STARTED = 'started',
  FINISHED = 'finished',
}

class Game {
  private id: string;

  private players: Map<string, User>;

  private spectators: Map<string, User>;

  private status: GameStatus;

  constructor(id: string) {
    this.id = id;
    this.players = new Map<string, User>();
    this.spectators = new Map<string, User>();
    this.status = GameStatus.WAITING;

    this.startGameLoop();
  }

  startGameLoop() {
    setInterval(() => {
      if (this.status !== GameStatus.STARTED) return;

      this.players.forEach((player) => {
        player.produce();
      });
    }, GAME_CYCLE);
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
    if (this.getPlayerCount() >= MAX_PLAYERS && !this.spectators.has(userId)) {
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
      this.status = GameStatus.STARTED;
    }
  }

  progress(userId: string, behaviors: Array<number>): void {
    if (this.players.has(userId)) {
      // TODO : Pass the actual data
      this.players.get(userId)?.setStateOfMind(behaviors);
    }
  }

  movePlayerHead(userId: string, position: Vector): void {
    if (this.players.has(userId)) {
      this.players.get(userId)?.setHeadPosition(position);
    }
  }

  getGameProgress(): Array<UserState> {
    return Array.from(this.players, ([, value]) => (value.userState()));
  }

  isFull(): boolean {
    return this.getPlayerCount() >= MAX_PLAYERS;
  }

  getUsersArray(): Array<{ id: string, ready: boolean }> {
    return Array.from(this.players, ([key, value]) => ({ id: key, ready: value.isReady() }));
  }

  getStatus(): GameStatus {
    // TODO: Implement winning condition
    const winners = Array.from(this.players.values()).filter((player) => player.isWinner());
    if (winners.length > 0) {
      this.status = GameStatus.FINISHED;
    }
    return this.status;
  }
}

export default Game;
