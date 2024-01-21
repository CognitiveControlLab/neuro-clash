import type Game from '../game';

class DB {
  private static db = {
    games: new Map<string, Game>(),
  };

  static getGame(gameId: string): Game | undefined {
    return this.db.games.get(gameId);
  }

  static setGame(game: Game): void {
    this.db.games.set(game.getId(), game);
  }

  static reset(): void {
    this.db = {
      games: new Map<string, Game>(),
    };
  }
}

export default DB;
