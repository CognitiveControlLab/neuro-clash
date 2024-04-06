import DB from '../db';
import Game from './game';

describe('game', () => {
  afterEach(() => {
    DB.reset();
  });

  it('Expect game to be defined', () => {
    expect(Game).toBeDefined();
  });

  it('Expect game to have players', () => {
    const instance = Game.getOrCreate('gameId');

    instance.join('playerId1');

    expect(instance.getPlayerCount()).toBeDefined();
  });

  it('Expect game to have spectators', () => {
    const instance = Game.getOrCreate('gameId');

    instance.join('playerId1');
    instance.join('playerId2');
    instance.join('spectatorId');

    expect(instance.getSpectatorCount());
  });

  it('Expect game to have empty score', () => {
    const instance = Game.getOrCreate('gameId');
    expect(instance.getScores()).toEqual([]);
  });

  it('Expect game to have scores', () => {
    const instance = Game.getOrCreate('gameId');

    instance.join('playerId1');
    instance.join('playerId2');

    instance.progress('playerId1', { data: { samples: [{ x: 1, y: 2, z: 3 }] }, type: 'accelerometer' });
    instance.progress('playerId2', { data: { samples: [{ x: 1, y: 2, z: 3 }] }, type: 'accelerometer' });

    expect(instance.getScores()).toEqual([{ userId: 'playerId1', score: { x: 1, y: 2, z: 3 } }, { userId: 'playerId2', score: { x: 1, y: 2, z: 3 } }]);
  });

  it('Expect to get game', () => {
    const instance = Game.getOrCreate('gameId');

    instance.join('playerId1');

    expect(Game.getOrCreate('gameId')).toEqual(instance);
  });

  it('Expect to start only after the two player are ready', () => {
    const instance = Game.getOrCreate('gameId');

    // Player join
    instance.join('playerId1');
    instance.join('playerId2');

    // Player toggle ready
    instance.toggleReady('playerId1');
    expect(instance.getStatus()).toEqual('waiting');
    instance.toggleReady('playerId1');
    expect(instance.getStatus()).toEqual('waiting');
    instance.toggleReady('playerId2');
    expect(instance.getStatus()).toEqual('waiting');
    instance.toggleReady('playerId2');
    expect(instance.getStatus()).toEqual('waiting');

    // Two player are ready
    instance.toggleReady('playerId1');
    instance.toggleReady('playerId2');

    expect(instance.getStatus()).toEqual('started');
  });

  it('Expect to start with spectators', () => {
    const instance = Game.getOrCreate('gameId');

    // Player join
    instance.join('playerId1');
    instance.join('playerId2');
    instance.join('spectatorId1');

    // Player toggle ready
    instance.toggleReady('playerId1');
    instance.toggleReady('playerId2');

    expect(instance.getStatus()).toEqual('started');
  });
});
