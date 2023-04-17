export interface Staker {
    stake(): Promise<void>;
    withdraw(): Promise<void>;
    redeem(): Promise<void>;
}