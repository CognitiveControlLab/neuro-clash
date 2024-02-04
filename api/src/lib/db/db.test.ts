import Game from '../game';
import DB from './db';

describe('DB', () => {
  it('Expect db to be defined', () => {
    expect(DB).toBeDefined();
  });

  it('Expect db to get game', () => {
    DB.setGame(new Game('test'));
    expect(DB.getGame('test')).toBeDefined();
  });
});
