import type { BaseContract, ContractRunner, TransactionReceipt, TransactionResponse } from 'ethers';
//
import type Farm from './Farm';
import { createContract } from './chain';

export interface Staker {
	stake(amount: number): Promise<TransactionReceipt>;
	unstake(amount: number): Promise<TransactionReceipt>;
	deposit(amount: number): Promise<TransactionReceipt>;
	withdraw(amount: number): Promise<TransactionReceipt>;
	redeem(amount: number): Promise<TransactionReceipt>;
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

	stake = async (amount: number): Promise<TransactionReceipt> => {
		const tx: TransactionResponse = await this.contract.stake(this.poolId, amount);
		return await tx.wait();
	};

	unstake = async (amount: number): Promise<TransactionReceipt> => {
		const tx: TransactionResponse = await this.contract.unstake(this.poolId, amount);
		return await tx.wait();
	};

	deposit = async (amount: number): Promise<TransactionReceipt> => {
		const tx: TransactionResponse = await this.contract.deposit(this.poolId, amount);
		return await tx.wait();
	};

	withdraw = async (amount: number): Promise<TransactionReceipt> => {
		const tx: TransactionResponse = await this.contract.withdraw(this.poolId, amount);
		return await tx.wait();
	};

	redeem = async (amount: number): Promise<TransactionReceipt> => {
		const tx: TransactionResponse = await this.contract.redeem(this.poolId, amount);
		return await tx.wait();
	};
}
