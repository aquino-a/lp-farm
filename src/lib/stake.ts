import type { BaseContract, Contract, ContractRunner } from 'ethers';
//
import type Farm from './Farm';
import { createContract } from './chain';

export interface Staker {
	stake(amount: number): Promise<void>;
	unstake(amount: number): Promise<void>;
	deposit(amount: number): Promise<void>;
	withdraw(amount: number): Promise<void>;
	redeem(amount: number): Promise<void>;
}

export const createStaker = (farm: Farm, runner: ContractRunner): Staker => {
	const contract = createContract(farm.address, farm.abi);
	const contractWithRunner = contract.connect(runner);
	const staker = new BaseStaker(farm.poolId, contractWithRunner);

	return staker;
};

class BaseStaker implements Staker {
	readonly poolId: number;
	readonly contract: BaseContract;

	/**
	 * Creates an instance of BaseStaker.
	 *
	 * @param {number} poolId the pool id (array index#) of the pool in the contract.
	 * @param {Contract} contract should have a valid signer.
	 * @memberof BaseStaker
	 */
	constructor(poolId: number, contract: BaseContract) {
		this.poolId = poolId;
		this.contract = contract;
	}

	stake = async (amount: number) => {
		await this.executeContractFunction('stake', amount);
	};

	unstake = async (amount: number) => {
		await this.executeContractFunction('unstake', amount);
	};

	deposit = async (amount: number) => {
		await this.executeContractFunction('deposit', amount);
	};

	withdraw = async (amount: number) => {
		await this.executeContractFunction('withdraw', amount);
	};

	redeem = async (amount: number) => {
		await this.executeContractFunction('redeem', amount);
	};

	private executeContractFunction = async (name: string, amount: number) => {
		// @ts-expect-error contract functions are not known.
		const tx = await this.contract[name](this.poolId, amount);
		await tx.wait();
	};
}
