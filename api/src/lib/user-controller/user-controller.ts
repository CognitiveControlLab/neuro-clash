import { BEHAVIORS, MAX_BANK, MAX_PRODUCTION } from '../../dictionary/game';

export interface Vector {
  x: number;
  y: number;
  z: number;
}

export interface UserState {
  id: string;
  production: Array<{ behavior: string, value: number }>;
  bank: Array<{ behavior: string, value: number }>;
  headPosition: Vector;
  isWinner: boolean;
}

class User {
  private id: string;

  private bank: Array<number>;

  // Production but change way faster
  private stateOfMind: Array<number>;

  private production: Array<number>;

  private ready: boolean;

  private headPosition: Vector;

  private winner: boolean;

  constructor(id: string) {
    this.id = id;
    this.ready = false;
    this.bank = new Array(BEHAVIORS.length).fill(MAX_BANK / 2);
    this.stateOfMind = new Array(BEHAVIORS.length).fill(0);
    this.production = new Array(BEHAVIORS.length).fill(0);
    this.headPosition = { x: 0, y: 0, z: 0 };
    this.winner = false;
  }

  public setHeadPosition(position: Vector): void {
    this.headPosition = position;
  }

  public setStateOfMind(stateOfMind: Array<number>): void {
    this.stateOfMind = stateOfMind;
  }

  public produce(): Array<number> {
    this.production = this.stateOfMind;
    return this.production;
  }

  public updateBank(production: Array<number>): void {
    this.bank = this.bank.map((value, index) => {
      const newAssetValue = production[index] + value;

      if (newAssetValue < 0) {
        return 0;
      }

      if (newAssetValue > MAX_BANK) {
        return MAX_BANK;
      }

      return newAssetValue;
    });
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

  public getBank(): Array<{ behavior: string, value: number }> {
    return this.bank.map((value, index) => ({
      behavior: BEHAVIORS[index],
      value,
      max: MAX_BANK / 2,
    }));
  }

  public getProduction(): Array<{ behavior: string, value: number }> {
    return this.production.map((value, index) => ({
      behavior: BEHAVIORS[index],
      value,
      max: MAX_PRODUCTION,
    }));
  }

  public userState(): UserState {
    return {
      id: this.id,
      production: this.getProduction(),
      bank: this.getBank(),
      headPosition: this.headPosition,
      isWinner: this.isWinner(),
    };
  }

  public isWinner(): boolean {
    this.winner = this.bank.some((value) => value === MAX_BANK);
    return this.winner;
  }
}

export default User;
